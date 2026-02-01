
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Maximize, Phone, MessageSquare, Share2, 
  ChevronLeft, ChevronRight, Sparkles, Building, Calendar, Info
} from 'lucide-react';
import { Property, Inquiry } from '../types';
import { addInquiry } from '../services/storage';
import { getPropertyInsights } from '../services/gemini';

interface DetailsPageProps {
  properties: Property[];
  onRefresh: () => void;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ properties, onRefresh }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);
  
  const [currentImage, setCurrentImage] = useState(0);
  const [aiInsights, setAiInsights] = useState<string>('Analyzing property data...');
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (property) {
      getPropertyInsights(property).then(setAiInsights);
    }
  }, [property]);

  if (!property) return <div className="p-24 text-center">Property not found.</div>;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newInquiry: Inquiry = {
      id: Date.now().toString(),
      propertyId: property.id,
      ...inquiryForm,
      timestamp: Date.now()
    };
    
    setTimeout(() => {
      addInquiry(newInquiry);
      setIsSubmitting(false);
      setSubmitted(true);
      onRefresh();
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property in ${property.location.city}: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-gray-50 pb-24 animate-in fade-in duration-500">
      {/* Gallery Header */}
      <section className="relative h-[50vh] min-h-[400px] bg-black">
        <img 
          src={property.images[currentImage]} 
          alt={property.title}
          className="w-full h-full object-contain md:object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        
        <div className="absolute top-8 left-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute bottom-8 right-8 flex gap-3">
          <button 
            onClick={handleShare}
            className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all"
          >
            <Share2 size={24} />
          </button>
        </div>

        {property.images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentImage(i)}
                className={`w-3 h-3 rounded-full transition-all ${currentImage === i ? 'bg-emerald-500 w-8' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">
                  {property.status}
                </span>
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
                  {property.type}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                {property.title}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-8 pb-8 border-b border-gray-100">
                <MapPin className="mr-2 text-emerald-500" />
                <span className="text-lg">{property.location.city}, {property.location.district}, {property.location.province} Province</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-3xl text-center">
                  <Maximize className="mx-auto mb-3 text-emerald-600" size={24} />
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Area</p>
                  <p className="text-xl font-bold text-gray-900">
                    {property.area > 0 ? `${property.area} Aana` : `${property.areaSqFt} Sq.ft`}
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl text-center">
                  <Building className="mx-auto mb-3 text-emerald-600" size={24} />
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Type</p>
                  <p className="text-xl font-bold text-gray-900">{property.type}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl text-center">
                  <Calendar className="mx-auto mb-3 text-emerald-600" size={24} />
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Listed</p>
                  <p className="text-xl font-bold text-gray-900">{new Date(property.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl text-center">
                  <Info className="mx-auto mb-3 text-emerald-600" size={24} />
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Status</p>
                  <p className="text-xl font-bold text-gray-900">{property.isAvailable ? 'Available' : 'Sold Out'}</p>
                </div>
              </div>

              {/* Gemini Insights */}
              <div className="bg-emerald-600 rounded-3xl p-8 mb-12 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Sparkles size={20} className="text-emerald-50" />
                  </div>
                  <h3 className="font-bold text-xl">AI Property Insights</h3>
                </div>
                <p className="text-emerald-50 leading-relaxed relative z-10 italic">
                  "{aiInsights}"
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                  {property.description}
                </p>
              </div>

              {/* Map Placeholder */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Location Map</h3>
                <div className="h-96 w-full bg-gray-100 rounded-3xl overflow-hidden relative border border-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto mb-4 text-emerald-200" />
                      <p className="font-medium">Map View (Simulated)</p>
                      <p className="text-sm">Coordinates: {property.location.coordinates?.lat}, {property.location.coordinates?.lng}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Inquiry Form */}
          <div className="lg:w-[400px]">
            <div className="sticky top-24 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
              <div className="mb-8">
                <p className="text-gray-500 text-sm mb-1">Total Price</p>
                <p className="text-4xl font-extrabold text-emerald-700">
                  रू {property.price.toLocaleString()}
                </p>
              </div>
              
              <div className="flex flex-col gap-3 mb-8">
                <a 
                  href={`tel:${property.contactPhone}`}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
                >
                  <Phone size={20} /> Call {property.contactName}
                </a>
                <a 
                  href={`https://wa.me/${property.contactWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-50 text-emerald-700 rounded-2xl font-bold hover:bg-emerald-100 transition-colors"
                >
                  Message via WhatsApp
                </a>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MessageSquare size={18} className="text-emerald-600" />
                  Inquiry About This Property
                </h4>
                
                {submitted ? (
                  <div className="bg-emerald-50 p-6 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles size={24} />
                    </div>
                    <p className="font-bold text-emerald-900 mb-1">Inquiry Sent!</p>
                    <p className="text-emerald-700 text-sm">Our agent will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                    />
                    <textarea 
                      placeholder="Message" 
                      rows={4}
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                    ></textarea>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
