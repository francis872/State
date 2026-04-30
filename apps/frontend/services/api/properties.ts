import api from './api';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
}

export async function getProperties(): Promise<Property[]> {
  const { data } = await api.get('/properties');
  return data.properties;
}

export async function createProperty(property: Omit<Property, 'id'>): Promise<Property> {
  const { data } = await api.post('/properties', property);
  return data.property;
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<Property> {
  const { data } = await api.put(`/properties/${id}`, property);
  return data.property;
}

export async function deleteProperty(id: string): Promise<void> {
  await api.delete(`/properties/${id}`);
}

export async function matchLeadToProperties(leadId: string) {
  const { data } = await api.post(`/properties/match/${leadId}`);
  return data.matches;
}
