import React, { useEffect, useState } from 'react';
import { getDashboardSummary, getFuelDistribution, getBrandSales } from '../services/api';
import { IndianRupee, ShoppingBag, Users, Car as CarIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Dashboard() {
  const [summary, setSummary] = useState({ totalRevenue: 0, totalCarsSold: 0, totalCustomers: 0, totalAvailableCars: 0 });
  const [fuelData, setFuelData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    getDashboardSummary().then(setSummary).catch(console.error);
    getFuelDistribution().then(setFuelData).catch(console.error);
    getBrandSales().then(setBrandData).catch(console.error);
  }, []);

  const cards = [
    { title: 'Total Revenue', value: `₹${(summary.totalRevenue || 0).toLocaleString()} L`, icon: IndianRupee, color: 'bg-emerald-500' },
    { title: 'Cars Sold', value: summary.totalCarsSold || 0, icon: ShoppingBag, color: 'bg-blue-500' },
    { title: 'Customers', value: summary.totalCustomers || 0, icon: Users, color: 'bg-purple-500' },
    { title: 'Available Inventory', value: summary.totalAvailableCars || 0, icon: CarIcon, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
              </div>
              <div className={`p-3 rounded-xl text-white ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Brands Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Brand Performance</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brandData}>
                <XAxis dataKey="brand" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fuel Type Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Fuel Type Analysis</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={fuelData} dataKey="count" nameKey="fuelType" cx="50%" cy="50%" outerRadius={90} label>
                  {fuelData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}