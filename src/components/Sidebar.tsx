'use client';

import {
  LayoutDashboard,
  Package,
  ArrowDownCircle,
  ArrowUpCircle,
  Box,
  Users,
  Smartphone,
  Building2,
  Grid,
  Plug,
  UserCheck,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Package, label: 'Inventory', active: false },
  { icon: ArrowDownCircle, label: 'Arrivals', active: false },
  { icon: ArrowUpCircle, label: 'Departures', active: false },
  { icon: Box, label: 'Kits', active: false },
  { icon: Users, label: 'Operators', active: false },
  { icon: Smartphone, label: 'Devices', active: false },
  { icon: Building2, label: 'Facilities', active: false },
  { icon: Grid, label: 'Apps', active: false },
  { icon: Plug, label: 'Integrations', active: false },
  { icon: UserCheck, label: 'Team', active: false },
  { icon: Briefcase, label: 'Company', active: false },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className="flex flex-col bg-[#1a1f36] transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? '70px' : '240px', minWidth: collapsed ? '70px' : '240px' }}
    >
      {/* Logo */}
      <div className="flex items-center px-4 py-5 border-b border-[#2d3354]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500 flex-shrink-0">
          <span className="text-white font-bold text-sm">J</span>
        </div>
        {!collapsed && (
          <span className="ml-3 text-white font-bold text-lg tracking-wide">Jeeny</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center rounded-lg transition-all duration-150 group relative ${
                  item.active
                    ? 'bg-[#2d3354] text-white'
                    : 'text-gray-400 hover:bg-[#252b45] hover:text-white'
                } ${collapsed ? 'justify-center px-2 py-3' : 'px-3 py-2.5'}`}
              >
                {item.active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-500 rounded-r-full" />
                )}
                <item.icon
                  size={20}
                  className={`flex-shrink-0 ${
                    item.active ? 'text-amber-400' : 'text-gray-400 group-hover:text-gray-200'
                  }`}
                />
                {!collapsed && (
                  <span
                    className={`ml-3 text-sm font-medium whitespace-nowrap ${
                      item.active ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  >
                    {item.label}
                  </span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {item.label}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="border-t border-[#2d3354] p-3">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#252b45] hover:text-white transition-all duration-150 group"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
