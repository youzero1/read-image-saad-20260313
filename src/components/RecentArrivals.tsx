'use client';

import { useEffect, useState } from 'react';
import { ArrowDownCircle, Clock } from 'lucide-react';

interface Arrival {
  id: number;
  name: string;
  status: string;
  quantity: number;
  createdAt: string;
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; dot: string }> = {
    completed: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
    'in-transit': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  };
  const c = config[status] ?? { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function RecentArrivals() {
  const [arrivals, setArrivals] = useState<Arrival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArrivals() {
      try {
        const res = await fetch('/api/arrivals');
        const data = await res.json();
        setArrivals((data.arrivals ?? []).slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch arrivals:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArrivals();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <ArrowDownCircle size={16} className="text-green-600" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800">Recent Arrivals</h3>
        </div>
        <button className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors">
          View all
        </button>
      </div>

      {loading ? (
        <div className="p-5 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : arrivals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center px-4">
          <ArrowDownCircle size={32} className="text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">No arrivals yet</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-2 px-5 py-2 bg-gray-50">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Name</span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Status</span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Qty</span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Date</span>
          </div>
          {arrivals.map((arrival) => (
            <div key={arrival.id} className="grid grid-cols-4 gap-2 px-5 py-3 hover:bg-gray-50 transition-colors items-center">
              <span className="text-sm font-medium text-gray-700 truncate">{arrival.name}</span>
              <StatusBadge status={arrival.status} />
              <span className="text-sm text-gray-600">{arrival.quantity}</span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={11} />
                <span>{new Date(arrival.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
