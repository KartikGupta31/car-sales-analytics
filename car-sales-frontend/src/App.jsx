import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AIRecommendation from './components/AIRecommendation';
import CarInventory from './components/CarInventory';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'recommend' && <AIRecommendation />}
        {activeTab === 'inventory' && <CarInventory />}
      </main>
    </div>
  );
}