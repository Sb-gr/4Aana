
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Maximize, Phone, Heart } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 group relative">
      <button 
        onClick={(e) => { e.preventDefault(); onToggleFavorite(property.id); }}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-colors ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/70 dark:bg-slate-800/70 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800'}`}
      >
        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
      
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative h-60 overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-sm">
              {property.status}
            </span>
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
              {property.type}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
            <MapPin size={14} className="mr-1 text-emerald-500" />
            {property.location.city}, {property.location.district}
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">{property.title}</h3>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <Maximize size={16} className="mr-1 text-blue-500" />
              <span>{property.area > 0 ? `${property.area} Aana` : `${property.areaSqFt} Sq.ft`}</span>
            </div>
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
              रू {property.price >= 10000000 
                ? (property.price / 10000000).toFixed(2) + ' Cr' 
                : (property.price / 100000).toFixed(1) + ' Lakh'}
            </p>
          </div>
        </div>
      </Link>
      
      <div className="px-5 pb-5 pt-0 flex gap-2">
        <a 
          href={`tel:${property.contactPhone}`}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors text-sm font-semibold"
        >
          <Phone size={14} /> Call
        </a>
        <a 
          href={`https://wa.me/${property.contactWhatsApp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-sm font-semibold"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
