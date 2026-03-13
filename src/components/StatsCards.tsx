'use client';

import { useEffect, useState } from 'react';
import { Package, ArrowDownCircle, ArrowUpCircle, Box, TrendingUp } from 'lucide-react';

interface StatCard {
  label: string;
  count: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  trend?: string;
}

export default function StatsCards() {
  const [stats, setStats] = useState({
    items: 0,
    arrivals: 0,
    departures: 0,
    kits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [itemsRes, arrivalsRes, departuresRes, kitsRes] = await Promise.all([
          fetch('/api/items'),
          fetch('/api/arrivals'),
          fetch('/api/departures'),
          fetch('/api/kits'),
        ]);
        const [items, arrivals, departures, kits] = await Promise.all([
          itemsRes.json(),
          arrivalsRes.json(),
          departuresRes.json(),
          kitsRes.json(),
        ]);
        setStats({
          items: items.count ?? 0,
          arrivals: arrivals.count ?? 0,
          departures: departures.count ?? 0,
          kits: kits.count ?? 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const cards: StatCard[] = [
    {
      label: 'Items',
      count: stats.items,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: '+2 this week',
    },
    {
      label: 'Arrivals',
      count: stats.arrivals,
      icon: ArrowDownCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: '+1 today',
    },
    {
      label: 'Departures',
      count: stats.departures,
      icon: ArrowUpCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: '+3 this week',
    },
    {
      label: 'Kits',
      count: stats.kits,
      icon: Box,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: 'No change',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-11 h-11 rounded-xl ${card.bgColor} flex items-center justify-center`}>
              <card.icon size={22} className={card.color} />
            </div>
            <TrendingUp size={16} className="text-gray-300" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {loading ? (
                <div className="h-7 w-12 bg-gray-200 rounded animate-pulse" />
              ) : (
                card.count
              )}
            </div>
            <div className="text-sm font-medium text-gray-500">{card.label}</div>
            {card.trend && (
              <div className="text-xs text-gray-400 mt-1">{card.trend}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
