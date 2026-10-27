import React, { useState } from 'react';
import { getAIRecommendations } from '../services/api';
import { Sparkles, Trophy, Fuel, Gauge, CheckCircle2 } from 'lucide-react';

export default function AIRecommendation() {
  const [form, setForm] = useState({
    min_budget: 8,
    max_budget: 18,
    preferred_brand: 'Hyundai',
    fuel_type: 'Petrol',
    min_mileage: 15,
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getAIRecommendations(form);
      setRecommendations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Preference Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-2 mb-6">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Match Preferences</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Budget Range (₹ Lakhs)</label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <input
                type="number"
                value={form.min_budget}
                onChange={(e) => setForm({ ...form, min_budget: parseFloat(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                placeholder="Min"
              />
              <input
                type="number"
                value={form.max_budget}
                onChange={(e) => setForm({ ...form, max_budget: parseFloat(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                placeholder="Max"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Preferred Brand</label>
            <input
              type="text"
              value={form.preferred_brand}
              onChange={(e) => setForm({ ...form, preferred_brand: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Fuel Type</label>
            <select
              value={form.fuel_type}
              onChange={(e) => setForm({ ...form, fuel_type: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Min Mileage (km/l)</label>
            <input
              type="number"
              value={form.min_mileage}
              onChange={(e) => setForm({ ...form, min_mileage: parseFloat(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition shadow flex items-center justify-center space-x-2"
          >
            {loading ? <span>Analyzing...</span> : <><span>Get AI Recommendations</span><Sparkles className="h-4 w-4" /></>}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Ranked Recommendations</h2>
        {recommendations.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-dashed border-slate-300">
            <Trophy className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Configure preferences and run AI matching to see top results.</p>
          </div>
        ) : (
          recommendations.map((car, rank) => (
            <div key={car.id || rank} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  rank === 0 ? 'bg-amber-100 text-amber-700' : rank === 1 ? 'bg-slate-200 text-slate-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  #{rank + 1}
                </span>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{car.brand} {car.model}</h3>
                  <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center space-x-1"><Fuel className="h-3.5 w-3.5" /><span>{car.fuelType}</span></span>
                    <span className="flex items-center space-x-1"><Gauge className="h-3.5 w-3.5" /><span>{car.mileage} km/l</span></span>
                    <span className="font-semibold text-slate-700">₹{car.price} Lakhs</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{car.matchPercentage}% Match</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}