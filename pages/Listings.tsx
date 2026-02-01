
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, MapPin, X, Search, Bed } from 'lucide-react';
import { Property, PropertyType, PropertyStatus } from '../types';
import PropertyCard from '../components/PropertyCard';
import { toggleFavorite } from '../services/storage';

interface ListingsPageProps {
  properties: Property[];
  favorites: string[];
  onRefresh: () => void;
}

const ListingsPage: React.FC<ListingsPageProps> = ({ properties, favorites, onRefresh }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Filter States
  const [filters, setFilters] = useState({
    query: searchParams.get('q') || '',
    type: (searchParams.get('type') as PropertyType) || 'All',
    status: (searchParams.get('status') as PropertyStatus) || 'All',
    minPrice: '',
    maxPrice: '',
    district: ''
  });

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      query: searchParams.get('q') || '',
      type: (searchParams.get('type') as PropertyType) || 'All'
    }));
  }, [searchParams]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchQuery = !filters.query || 
        p.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        p.location.city.toLowerCase().includes(filters.query.toLowerCase()) ||
        p.location.district.toLowerCase().includes(filters.query.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchType = filters.type === 'All' || p.type === filters.type;
      const matchStatus = filters.status === 'All' || p.status === filters.status;
      const matchMin = !filters.minPrice || p.price >= Number(filters.minPrice);
      const matchMax = !filters.maxPrice || p.price <= Number(filters.maxPrice);
      const matchDistrict = !filters.district || p.location.district.toLowerCase() === filters.district.toLowerCase();

      return matchQuery && matchType && matchStatus && matchMin && matchMax && matchDistrict;
    });
  }, [properties, filters]);

  const handleFavoriteToggle = (id: string) => {
    toggleFavorite(id);
    onRefresh();
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Sidebar Filters */}
        <div className={`fixed inset-0 z-50 bg-white md:relative md:inset-auto md:bg-transparent md:block w-full md:w-80 transition-all ${showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="p-8 md:p-0 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-10 md:hidden">
              <h2 className="text-3xl font-extrabold text-slate-900">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 bg-slate-100 rounded-full"><X /></button>
            </div>
            
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-24">
              <div className="mb-8">
                <h3 className="font-bold mb-4 text-slate-900 flex items-center gap-2">
                   Keyword Search
                </h3>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                    type="text" 
                    placeholder="e.g. Kathmandu, Koteshwor..."
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-transparent focus:border-emerald-500 transition-all text-sm outline-none"
                    value={filters.query}
                    onChange={(e) => setFilters({...filters, query: e.target.value})}
                    />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold mb-4 text-slate-900">Property Category</h3>
                <div className="space-y-3">
                  {['All', ...Object.values(PropertyType)].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="type" 
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                        checked={filters.type === type}
                        onChange={() => setFilters({...filters, type: type as any})}
                      />
                      <span className={`text-sm font-medium ${filters.type === type ? 'text-emerald-600 font-bold' : 'text-slate-600 group-hover:text-slate-900'}`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold mb-4 text-slate-900">Price Range (NPR)</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  />
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  />
                </div>
              </div>

              <button 
                onClick={() => setFilters({ query: '', type: 'All', status: 'All', minPrice: '', maxPrice: '', district: '' })}
                className="w-full py-4 text-sm font-bold text-slate-400 hover:text-red-500 transition-colors bg-slate-50 rounded-2xl"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Available Listings</h1>
              <p className="text-slate-500 mt-2 font-medium text-lg">Discover {filteredProperties.length} verified opportunities across Nepal.</p>
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="md:hidden p-4 bg-white border border-slate-200 rounded-2xl text-emerald-600 shadow-sm"
            >
              <SlidersHorizontal size={22} />
            </button>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
              {filteredProperties.map(prop => (
                <PropertyCard 
                  key={prop.id} 
                  property={prop} 
                  isFavorite={favorites.includes(prop.id)}
                  onToggleFavorite={handleFavoriteToggle}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-32 rounded-[3rem] border border-slate-100 text-center shadow-inner">
              <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={48} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">No matching results</h3>
              <p className="text-slate-500 text-lg">We couldn't find any properties matching your current criteria.</p>
              <button 
                onClick={() => setFilters({ query: '', type: 'All', status: 'All', minPrice: '', maxPrice: '', district: '' })}
                className="mt-10 px-10 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
