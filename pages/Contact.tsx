
import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = ({ settings }: { settings: SiteSettings }) => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Have questions about a listing or want to list your own property? Our team is here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="flex gap-8 items-start">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shrink-0">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-500 mb-2">For general inquiries and support</p>
                <p className="text-xl font-bold text-emerald-600">{settings.contactEmail}</p>
              </div>
            </div>
            
            <div className="flex gap-8 items-start">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shrink-0">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-500 mb-2">Available Sun-Fri, 10 AM to 6 PM</p>
                <p className="text-xl font-bold text-blue-600">{settings.contactPhone}</p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Office</h3>
                <p className="text-gray-500 leading-relaxed">
                  Baneshwor, Kathmandu<br />
                  Bagmati Province, Nepal
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-12 rounded-[3rem]">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8">
                  <Send size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Received!</h2>
                <p className="text-gray-600 max-w-md">
                  Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                </p>
                <button onClick={() => setSent(false)} className="mt-12 text-emerald-600 font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input required type="text" className="w-full p-4 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input required type="email" className="w-full p-4 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <input required type="text" className="w-full p-4 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea required rows={6} className="w-full p-4 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-3">
                  <Send size={20} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
