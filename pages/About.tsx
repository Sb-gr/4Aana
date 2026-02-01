
import React from 'react';
import { SiteSettings } from '../types';
import { Target, Users, ShieldCheck } from 'lucide-react';

const AboutPage = ({ settings }: { settings: SiteSettings }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-emerald-600 py-32 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8">Our Mission</h1>
          <p className="text-xl text-emerald-50 leading-relaxed opacity-90">
            {settings.aboutText}
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-12 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Verified Only</h3>
            <p className="text-gray-500 leading-relaxed">
              Every property listed on 4 Aana goes through a rigorous verification process to ensure the legality of documents and property area.
            </p>
          </div>
          <div className="p-12 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Expertise</h3>
            <p className="text-gray-500 leading-relaxed">
              We understand the nuances of the Nepali market, from Aana to Bigha, and Kathmandu to Chitwan.
            </p>
          </div>
          <div className="p-12 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer First</h3>
            <p className="text-gray-500 leading-relaxed">
              Our priority is helping you find a home that fits your budget and aspirations. We are with you every step of the way.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <img src="https://picsum.photos/seed/office/800/600" className="rounded-[3rem] shadow-2xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">Empowering Real Estate in the Heart of Himalayas</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Since our inception, 4 Aana has been at the forefront of the digital real estate revolution in Nepal. We believe that finding a home should be as easy as taking a walk in a garden. 
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you are a first-time buyer or a seasoned investor, our platform provides the tools and insights you need to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
