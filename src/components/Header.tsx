'use client';

import { Bell, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

export default function Header({ sidebarCollapsed: _ }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
      {/* Breadcrumb / Page Title */}
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm">Home</span>
        <span className="text-gray-300 text-sm">/</span>
        <span className="text-gray-800 text-sm font-semibold">Dashboard</span>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-gray-800 leading-tight">Admin User</span>
            <span className="text-xs text-gray-500 leading-tight">Administrator</span>
          </div>
          <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
