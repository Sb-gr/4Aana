
import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Home, MessageSquare, Settings, 
  LogOut, Check, X, Search, MapPin, Building, Activity,
  Save, Eye, Image as ImageIcon, Trash, Phone
} from 'lucide-react';
import { Property, Inquiry, SiteSettings, PropertyType, PropertyStatus } from '../types';
import { getAppState, saveAppState, deleteProperty, updateProperty, addProperty } from '../services/storage';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [state, setState] = useState(getAppState());
  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries' | 'settings'>('properties');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    setState(getAppState());
  }, []);

  const refresh = () => setState(getAppState());

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      deleteProperty(id);
      refresh();
    }
  };

  const PropertyForm = ({ property, onCancel }: { property: Partial<Property>, onCancel: () => void }) => {
    const [form, setForm] = useState<Partial<Property>>({
      id: property.id || Date.now().toString(),
      title: property.title || '',
      type: property.type || PropertyType.Land,
      price: property.price || 0,
      area: property.area || 0,
      location: property.location || { province: 'Bagmati', district: 'Kathmandu', city: '' },
      images: property.images?.length ? property.images : [''],
      description: property.description || '',
      status: property.status || PropertyStatus.ForSale,
      isAvailable: property.isAvailable ?? true,
      isFeatured: property.isFeatured ?? false,
      contactName: property.contactName || 'sumanbasnet2030',
      contactPhone: property.contactPhone || '984XXXXXXX',
      contactWhatsApp: property.contactWhatsApp || '984XXXXXXX',
      createdAt: property.createdAt || Date.now()
    });

    const handleImageChange = (index: number, value: string) => {
      const newImages = [...(form.images || [])];
      newImages[index] = value;
      setForm({ ...form, images: newImages });
    };

    const addImageField = () => {
      if ((form.images?.length || 0) < 5) {
        setForm({ ...form, images: [...(form.images || []), ''] });
      }
    };

    const removeImageField = (index: number) => {
      const newImages = (form.images || []).filter((_, i) => i !== index);
      setForm({ ...form, images: newImages.length ? newImages : [''] });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Filter out empty image strings
      const finalImages = (form.images || []).filter(img => img.trim() !== '');
      const finalForm = { ...form, images: finalImages.length ? finalImages : ['https://via.placeholder.com/800x600?text=No+Image'] };

      if (isAddingNew) {
        addProperty(finalForm as Property);
      } else {
        updateProperty(finalForm as Property);
      }
      onCancel();
      refresh();
    };

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="bg-white w-full max-w-5xl rounded-[3rem] p-8 md:p-12 overflow-y-auto max-h-[90vh] shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">{isAddingNew ? 'Post New Listing' : 'Edit Listing'}</h2>
            <button type="button" onClick={onCancel} className="p-3 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><X /></button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><Activity size={18} className="text-emerald-500" /> Basic Details</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Property Title</label>
                    <input required type="text" className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none border border-transparent focus:border-emerald-500 transition-all" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Luxury Villa in Kathmandu" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                      <select className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none cursor-pointer" value={form.type} onChange={e => setForm({...form, type: e.target.value as PropertyType})}>
                        {Object.values(PropertyType).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                      <select className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none cursor-pointer" value={form.status} onChange={e => setForm({...form, status: e.target.value as PropertyStatus})}>
                        {Object.values(PropertyStatus).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Price (NPR)</label>
                      <input required type="number" className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Area (Aana/SqFt)</label>
                      <input required type="number" step="0.01" className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none" value={form.area} onChange={e => setForm({...form, area: Number(e.target.value)})} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><MapPin size={18} className="text-emerald-500" /> Location</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">District</label>
                    <input required type="text" className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none" value={form.location?.district} onChange={e => setForm({...form, location: {...form.location!, district: e.target.value}})} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                    <input required type="text" className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none" value={form.location?.city} onChange={e => setForm({...form, location: {...form.location!, city: e.target.value}})} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Description</label>
                <textarea required rows={5} className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none resize-none border border-transparent focus:border-emerald-500 transition-all" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe property features, facilities, road access..."></textarea>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><ImageIcon size={18} className="text-emerald-500" /> Property Images (Up to 5)</h3>
                  {(form.images?.length || 0) < 5 && (
                    <button type="button" onClick={addImageField} className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:text-emerald-700">
                      <Plus size={16} /> Add Another
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {form.images?.map((url, idx) => (
                    <div key={idx} className="flex gap-2">
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          placeholder={`Image URL ${idx + 1}`}
                          className="w-full p-4 bg-slate-50 rounded-2xl text-sm outline-none border border-transparent focus:border-emerald-500 transition-all"
                          value={url}
                          onChange={(e) => handleImageChange(idx, e.target.value)}
                        />
                        {url && (
                          <div className="mt-2 h-12 w-12 rounded-lg overflow-hidden border border-slate-200">
                            <img src={url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100x100?text=Error')} />
                          </div>
                        )}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeImageField(idx)}
                        className="p-4 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-[2rem] space-y-6">
                <h3 className="font-bold text-slate-800">Publishing Options</h3>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} />
                      <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </div>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Mark as Featured Listing</span>
                  </label>
                  
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" checked={form.isAvailable} onChange={e => setForm({...form, isAvailable: e.target.checked})} />
                      <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </div>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Property is Available</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4 pt-8 border-t border-slate-100">
            <button type="submit" className="flex-1 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 text-lg">
              {isAddingNew ? 'Publish Property' : 'Save Changes'}
            </button>
            <button type="button" onClick={onCancel} className="px-10 py-5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all text-lg">
              Discard
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row animate-in fade-in duration-500">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 p-10 flex flex-col">
        <div className="mb-14 flex items-center gap-3">
          <div className="bg-emerald-600 text-white font-bold p-2 rounded-xl text-xl shadow-lg shadow-emerald-900/20">4</div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Console</span>
        </div>

        <nav className="space-y-4 flex-grow">
          <button 
            onClick={() => setActiveTab('properties')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl font-bold transition-all ${activeTab === 'properties' ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <Home size={22} /> Listings
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl font-bold transition-all ${activeTab === 'inquiries' ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <MessageSquare size={22} /> Inquiries 
            {state.inquiries.length > 0 && <span className="ml-auto bg-emerald-600 text-white text-[11px] px-2.5 py-0.5 rounded-full shadow-lg shadow-emerald-900/20">{state.inquiries.length}</span>}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <Settings size={22} /> Site Settings
          </button>
        </nav>

        <button 
          onClick={onLogout}
          className="mt-12 w-full flex items-center gap-4 p-5 text-red-400 font-bold hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut size={22} /> Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-10 md:p-16 overflow-y-auto max-h-screen">
        {activeTab === 'properties' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Manage Inventory</h1>
                <p className="text-slate-500 mt-3 font-medium text-lg">Control your property database and published listings.</p>
              </div>
              <button 
                onClick={() => setIsAddingNew(true)}
                className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl shadow-emerald-900/20 flex items-center gap-3"
              >
                <Plus size={20} /> Add New Listing
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {state.properties.map(p => (
                <div key={p.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center gap-8 hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-inner shrink-0">
                    <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-3">
                      <span className={`text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full ${p.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {p.isAvailable ? 'Available' : 'Sold Out'}
                      </span>
                      <span className="bg-slate-100 text-slate-600 text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full">{p.type}</span>
                      {p.isFeatured && <span className="bg-blue-100 text-blue-700 text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full">Featured</span>}
                    </div>
                    <h3 className="font-bold text-2xl text-slate-900 mb-1">{p.title}</h3>
                    <p className="text-slate-500 flex items-center justify-center lg:justify-start gap-2 font-medium">
                        <MapPin size={16} className="text-emerald-500" /> {p.location.city}, {p.location.district}
                    </p>
                  </div>
                  <div className="lg:px-10 lg:border-l border-slate-100 flex flex-col items-center lg:items-end">
                    <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest mb-1">List Price</p>
                    <p className="font-extrabold text-2xl text-emerald-700">रू {p.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setEditingProperty(p)} className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-colors shadow-sm"><Edit size={22} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors shadow-sm"><Trash2 size={22} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-16 tracking-tight">Recent Leads</h1>
            {state.inquiries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {state.inquiries.map(iq => {
                  const prop = state.properties.find(p => p.id === iq.propertyId);
                  return (
                    <div key={iq.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      <div className="flex items-center gap-5 mb-8 relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-emerald-900/20">
                          {iq.name[0]}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xl text-slate-900">{iq.name}</h3>
                          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{new Date(iq.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="space-y-4 mb-8 relative z-10">
                        <div className="flex items-start gap-3">
                            <Home size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-slate-700 font-bold leading-tight">{prop?.title || 'Unknown Property'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Activity size={18} className="text-slate-400" />
                            <p className="text-slate-600 font-medium">{iq.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Settings size={18} className="text-slate-400" />
                            <p className="text-slate-600 font-medium">{iq.phone}</p>
                        </div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-3xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-emerald-500 relative z-10">
                        "{iq.message}"
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[4rem] border border-slate-100 shadow-inner">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                    <MessageSquare size={48} />
                </div>
                <p className="text-slate-400 font-bold text-xl">No inquiries found yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-16 tracking-tight">Platform Configuration</h1>
            <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-sm border border-slate-100 space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-4 flex items-center gap-3"><Eye size={24} className="text-emerald-500" /> Public Identity</h3>
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Homepage Headline</label>
                        <input type="text" className="w-full p-5 bg-slate-50 rounded-2xl text-slate-900 font-bold outline-none border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all" value={state.settings.homepageTitle} onChange={e => {
                        const newSettings = {...state.settings, homepageTitle: e.target.value};
                        setState({...state, settings: newSettings});
                        saveAppState({...state, settings: newSettings});
                        }} />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Supporting Tagline</label>
                        <textarea rows={3} className="w-full p-5 bg-slate-50 rounded-2xl text-slate-900 font-medium outline-none resize-none border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all" value={state.settings.homepageSubtitle} onChange={e => {
                        const newSettings = {...state.settings, homepageSubtitle: e.target.value};
                        setState({...state, settings: newSettings});
                        saveAppState({...state, settings: newSettings});
                        }} />
                    </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-4 flex items-center gap-3"><Phone size={24} className="text-emerald-500" /> Support Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Official Email</label>
                        <input type="email" className="w-full p-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all" value={state.settings.contactEmail} onChange={e => {
                            const newSettings = {...state.settings, contactEmail: e.target.value};
                            setState({...state, settings: newSettings});
                            saveAppState({...state, settings: newSettings});
                        }} />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Support Phone</label>
                        <input type="text" className="w-full p-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all" value={state.settings.contactPhone} onChange={e => {
                            const newSettings = {...state.settings, contactPhone: e.target.value};
                            setState({...state, settings: newSettings});
                            saveAppState({...state, settings: newSettings});
                        }} />
                    </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="bg-emerald-50 p-8 rounded-[2.5rem] flex items-center gap-6 text-emerald-800">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/20">
                    <Check size={32} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Auto-save Enabled</p>
                    <p className="text-emerald-600 font-medium">All changes to site settings are mirrored to your local database immediately.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {(editingProperty || isAddingNew) && (
        <PropertyForm 
          property={editingProperty || {}} 
          onCancel={() => { setEditingProperty(null); setIsAddingNew(false); }} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
