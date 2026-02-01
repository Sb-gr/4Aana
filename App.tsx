
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Search, Info, Phone, LogIn, Menu, X, LayoutDashboard, Sun, Moon } from 'lucide-react';

import HomePage from './pages/Home';
import ListingsPage from './pages/Listings';
import DetailsPage from './pages/Details';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import AdminLoginPage from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import { getAppState, saveAppState } from './services/storage';
import { AppState } from './types';

const Navbar = ({ isAdmin, theme, toggleTheme }: { isAdmin: boolean; theme: 'light' | 'dark'; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon size={18} /> },
    { name: 'Properties', path: '/listings', icon: <Search size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-emerald-600 text-white font-bold p-1.5 rounded-lg text-xl leading-none shadow-sm shadow-emerald-900/20">4</div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Aana</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-300'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800/50"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {isAdmin && (
              <Link to="/admin" className="px-4 py-2 bg-gray-900 dark:bg-emerald-600 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-md shadow-emerald-900/10">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-400">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-4 py-6 space-y-4 shadow-xl">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="text-emerald-600 dark:text-emerald-400">{link.icon}</span>
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 bg-gray-900 dark:bg-emerald-600 text-white rounded-xl font-bold">
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-950 text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-emerald-500 text-white font-bold p-1 rounded text-lg leading-none">4</div>
            <span className="text-2xl font-bold tracking-tight">Aana</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Nepal's most trusted real estate platform. We specialize in verified land listings, modern houses, and luxury apartments across Nepal.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/listings" className="hover:text-emerald-400 transition-colors">Browse Properties</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Property Types</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/listings?type=Land" className="hover:text-emerald-400 transition-colors">Lands in Nepal</Link></li>
            <li><Link to="/listings?type=House" className="hover:text-emerald-400 transition-colors">Houses for Sale</Link></li>
            <li><Link to="/listings?type=Apartment" className="hover:text-emerald-400 transition-colors">Apartments in Kathmandu</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Contact</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li>Kathmandu, Nepal</li>
            <li>+977 1 4500000</li>
            <li>hello@4aana.com.np</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} 4 Aana Nepal. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/admin-login" className="hover:text-white transition-colors flex items-center gap-1">
             <LogIn size={14} /> Admin Login
          </Link>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [appState, setAppState] = useState<AppState>(getAppState());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('4aana_theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('4aana_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAdminLogin = () => setIsAdmin(true);
  const handleAdminLogout = () => setIsAdmin(false);

  const refreshState = () => {
    setAppState(getAppState());
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isAdmin={isAdmin} theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage properties={appState.properties} settings={appState.settings} />} />
            <Route path="/listings" element={<ListingsPage properties={appState.properties} favorites={appState.favorites} onRefresh={refreshState} />} />
            <Route path="/property/:id" element={<DetailsPage properties={appState.properties} onRefresh={refreshState} />} />
            <Route path="/about" element={<AboutPage settings={appState.settings} />} />
            <Route path="/contact" element={<ContactPage settings={appState.settings} />} />
            <Route path="/admin-login" element={isAdmin ? <Navigate to="/admin" /> : <AdminLoginPage onLogin={handleAdminLogin} />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin-login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
