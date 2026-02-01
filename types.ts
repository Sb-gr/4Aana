
export enum PropertyType {
  Land = 'Land',
  House = 'House',
  Apartment = 'Apartment',
  Flat = 'Flat',
  Commercial = 'Commercial',
  Room = 'Room'
}

export enum PropertyStatus {
  ForSale = 'For Sale',
  ForRent = 'For Rent'
}

export interface Location {
  province: string;
  district: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  area: number; // in Aana
  areaSqFt?: number;
  location: Location;
  images: string[];
  description: string;
  status: PropertyStatus;
  isFeatured: boolean;
  isAvailable: boolean;
  contactName: string;
  contactPhone: string;
  contactWhatsApp: string;
  createdAt: number;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: number;
}

export interface SiteSettings {
  homepageTitle: string;
  homepageSubtitle: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  metaDescription: string;
}

export interface AppState {
  properties: Property[];
  inquiries: Inquiry[];
  settings: SiteSettings;
  favorites: string[];
}
