
import React from 'react';
import { Property, PropertyType, PropertyStatus, SiteSettings } from './types';

export const PROVINCES = [
  'Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'
];

export const DISTRICTS_BY_PROVINCE: Record<string, string[]> = {
  'Bagmati': ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Chitwan', 'Dhading', 'Nuwakot', 'Rasuwa', 'Sindhupalchok'],
  'Gandaki': ['Kaski', 'Tanahun', 'Gorkha', 'Lamjung', 'Syangja'],
  // Add more as needed
};

export const INITIAL_SETTINGS: SiteSettings = {
  homepageTitle: "Find Your Dream Property in Nepal",
  homepageSubtitle: "Your trusted marketplace for lands, houses, and apartments in the heart of the Himalayas.",
  aboutText: "4 Aana is Nepal's leading digital real estate platform, dedicated to bringing transparency and efficiency to the property market. Whether you're looking for a residential plot in Kathmandu or a commercial space in Pokhara, we connect you with the best opportunities.",
  contactEmail: "info@4aana.com.np",
  contactPhone: "+977 1 4XXXXXX",
  metaDescription: "The best place to buy, sell, or rent properties in Nepal. Specializing in Land, Houses, and Apartments."
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Beautiful 4 Aana Land in Budhanilkantha',
    type: PropertyType.Land,
    price: 35000000,
    area: 4,
    areaSqFt: 1369,
    location: {
      province: 'Bagmati',
      district: 'Kathmandu',
      city: 'Budhanilkantha',
      coordinates: { lat: 27.7788, lng: 85.3582 }
    },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop'
    ],
    description: 'Flat land located in a peaceful residential area of Budhanilkantha. South facing, with 13ft road access. Perfect for a luxury residence.',
    status: PropertyStatus.ForSale,
    isFeatured: true,
    isAvailable: true,
    contactName: 'Ram Shrestha',
    contactPhone: '9841000000',
    contactWhatsApp: '9841000000',
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Modern Apartment in Jhamsikhel',
    type: PropertyType.Apartment,
    price: 18500000,
    area: 0,
    areaSqFt: 1250,
    location: {
      province: 'Bagmati',
      district: 'Lalitpur',
      city: 'Jhamsikhel',
      coordinates: { lat: 27.6794, lng: 85.3023 }
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec239397118?q=80&w=2000&auto=format&fit=crop'
    ],
    description: '3 BHK Modern apartment with all amenities. Includes 24/7 security, gym, and swimming pool. Located in the prime hub of Jhamsikhel.',
    status: PropertyStatus.ForSale,
    isFeatured: true,
    isAvailable: true,
    contactName: 'Sita Sharma',
    contactPhone: '9851000000',
    contactWhatsApp: '9851000000',
    createdAt: Date.now()
  },
  {
    id: '3',
    title: 'Cozy Room for Rent in Koteshwor',
    type: PropertyType.Room,
    price: 8000,
    area: 0,
    areaSqFt: 180,
    location: {
      province: 'Bagmati',
      district: 'Kathmandu',
      city: 'Koteshwor',
      coordinates: { lat: 27.6756, lng: 85.3468 }
    },
    images: [
      'https://images.unsplash.com/photo-1522771739844-649fb49b2d88?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop'
    ],
    description: 'Single room available for rent. Attached bathroom, 24-hour water supply, and parking space for two-wheelers included.',
    status: PropertyStatus.ForRent,
    isFeatured: false,
    isAvailable: true,
    contactName: 'Hari Prasad',
    contactPhone: '9861000000',
    contactWhatsApp: '9861000000',
    createdAt: Date.now()
  }
];
