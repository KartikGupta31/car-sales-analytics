import React, { useEffect, useState } from 'react';
import { getAllCars, searchCars } from '../services/api';
import { Search, Car as CarIcon, Fuel, Gauge } from 'lucide-react';

export default function CarInventory() {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const data = await getAllCars();
      setCars(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchCars({ query: searchQuery });
      setCars(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <form onSubmit={handleSearch} className="flex-1 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search brand, model, or fuel type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow"
          >
            Search
          </button>
        </form>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Car Model</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Fuel Type</th>
                <th className="p-4">Mileage</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">Loading inventory...</td>
                </tr>
              ) : cars.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">No cars found in inventory.</td>
                </tr>
              ) : (
                cars.map((car) => (
                  <tr key={car.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-bold text-slate-800 flex items-center space-x-2">
                      <CarIcon className="h-4 w-4 text-indigo-500" />
                      <span>{car.model}</span>
                    </td>
                    <td className="p-4 text-slate-600">{car.brand}</td>
                    <td className="p-4 text-slate-600">{car.fuelType}</td>
                    <td className="p-4 text-slate-600">{car.mileage} km/l</td>
                    <td className="p-4 font-semibold text-slate-900">₹{car.price} Lakhs</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        car.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {car.status || 'AVAILABLE'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}