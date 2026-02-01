
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, Landmark, Home as HomeIcon, ArrowRight, Compass, Bed, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property, SiteSettings, PropertyType } from '../types';
import PropertyCard from '../components/PropertyCard';

interface HomeProps {
  properties: Property[];
  settings: SiteSettings;
}

const CategoryCard = ({ icon, label, count, type }: { icon: React.ReactNode, label: string, count: number, type: PropertyType }) => (
  <Link to={`/listings?type=${type}`} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">{label}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm">{count} Properties</p>
  </Link>
);

const HeroCarousel = ({ title, subtitle }: { title: string, subtitle: string }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522771739844-649fb49b2d88?q=80&w=2000&auto=format&fit=crop'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/listings?q=${searchQuery}`);
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-slate-950">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-50' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${slide})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      ))}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-semibold mb-8 backdrop-blur-md">
          <Compass size={16} />
          <span>Discover Nepal's Finest Properties</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1] max-w-4xl">
          {title.split(' ').map((word, i) => 
            word.toLowerCase() === 'dream' ? <span key={i} className="text-emerald-400"> {word} </span> : word + ' '
          )}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
          {subtitle}
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 rounded-3xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 dark:border-slate-800/50 flex flex-col md:flex-row items-center gap-2">
            <div className="flex-[1.5] w-full px-6 flex items-center gap-4 group">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-emerald-600 dark:text-emerald-400 group-focus-within:bg-emerald-600 group-focus-within:text-white transition-colors">
                <MapPin size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search location, district, or project..." 
                className="w-full py-4 bg-transparent text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:outline-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
            <button className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-2xl md:rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3">
              <Search size={22} />
              <span>Explore Listings</span>
            </button>
          </div>
        </form>

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-emerald-500 w-8' : 'bg-white/30'}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hidden md:block"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

const HomePage: React.FC<HomeProps> = ({ properties, settings }) => {
  const navigate = useNavigate();
  const featured = properties.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="animate-in fade-in duration-700">
      <HeroCarousel title={settings.homepageTitle} subtitle={settings.homepageSubtitle} />

      {/* Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4">
          <div className="text-center md:text-left">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-sm">Categories</span>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">Find Your Space</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg max-w-xl">Whether you want to buy land or rent a single room, we've got you covered.</p>
          </div>
          <Link to="/listings" className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <CategoryCard 
            icon={<Landmark size={24} />} 
            label="Land" 
            type={PropertyType.Land}
            count={properties.filter(p => p.type === PropertyType.Land).length} 
          />
          <CategoryCard 
            icon={<HomeIcon size={24} />} 
            label="House" 
            type={PropertyType.House}
            count={properties.filter(p => p.type === PropertyType.House).length} 
          />
          <CategoryCard 
            icon={<Building2 size={24} />} 
            label="Apartment" 
            type={PropertyType.Apartment}
            count={properties.filter(p => p.type === PropertyType.Apartment).length} 
          />
          <CategoryCard 
            icon={<Bed size={24} />} 
            label="Room for Rent" 
            type={PropertyType.Room}
            count={properties.filter(p => p.type === PropertyType.Room).length} 
          />
          <CategoryCard 
            icon={<Building2 size={24} />} 
            label="Commercial" 
            type={PropertyType.Commercial}
            count={properties.filter(p => p.type === PropertyType.Commercial).length} 
          />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4">
            <div className="text-center md:text-left">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-sm">Our Picks</span>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">Featured Listings</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">Hand-picked properties verified for quality and investment potential.</p>
            </div>
            <Link to="/listings" className="hidden md:flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:gap-4 transition-all group">
              Explore All Listings <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featured.map(prop => (
              <PropertyCard 
                key={prop.id} 
                property={prop} 
                isFavorite={false} 
                onToggleFavorite={() => {}} 
              />
            ))}
          </div>
          <div className="mt-16 md:hidden">
            <Link to="/listings" className="flex items-center justify-center gap-2 w-full py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
              View All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 overflow-hidden bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 dark:bg-slate-900/80 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">Ready to Find Your Home?</h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-16 text-xl leading-relaxed opacity-90">
                Join thousands of happy homeowners who found their perfect plot through 4 Aana. Our experts are ready to guide you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/listings" className="px-14 py-6 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl shadow-emerald-900/40 text-lg">
                  Start Browsing
                </Link>
                <Link to="/contact" className="px-14 py-6 bg-transparent text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/20 text-lg">
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
