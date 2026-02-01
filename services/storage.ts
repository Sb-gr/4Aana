
import { Property, Inquiry, SiteSettings, AppState } from '../types';
import { MOCK_PROPERTIES, INITIAL_SETTINGS } from '../constants';

const STORAGE_KEY = '4aana_state';

export const getAppState = (): AppState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const initialState: AppState = {
      properties: MOCK_PROPERTIES,
      inquiries: [],
      settings: INITIAL_SETTINGS,
      favorites: []
    };
    saveAppState(initialState);
    return initialState;
  }
  return JSON.parse(stored);
};

export const saveAppState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const addProperty = (property: Property) => {
  const state = getAppState();
  state.properties.push(property);
  saveAppState(state);
};

export const updateProperty = (updated: Property) => {
  const state = getAppState();
  state.properties = state.properties.map(p => p.id === updated.id ? updated : p);
  saveAppState(state);
};

export const deleteProperty = (id: string) => {
  const state = getAppState();
  state.properties = state.properties.filter(p => p.id !== id);
  saveAppState(state);
};

export const addInquiry = (inquiry: Inquiry) => {
  const state = getAppState();
  state.inquiries.push(inquiry);
  saveAppState(state);
};

export const toggleFavorite = (propertyId: string) => {
  const state = getAppState();
  if (state.favorites.includes(propertyId)) {
    state.favorites = state.favorites.filter(id => id !== propertyId);
  } else {
    state.favorites.push(propertyId);
  }
  saveAppState(state);
  return state.favorites;
};
