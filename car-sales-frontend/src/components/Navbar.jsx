import React from 'react';
import { LayoutDashboard, Car, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Car Inventory', icon: Car },
    { id: 'recommend', label: 'AI Recommender', icon: Sparkles },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Car className="h-8 w-8 text-indigo-400" />
          <span className="text-xl font-bold tracking-wide">AutoAnalytics AI</span>
        </div>
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}