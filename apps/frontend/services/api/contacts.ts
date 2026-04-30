import api from './api';

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  channel?: string;
  leads?: { score: number; status: string }[];
}

export async function getContacts(): Promise<Contact[]> {
  const { data } = await api.get('/contacts');
  return data.contacts;
}

export async function createContact(contact: { name: string; email?: string; phone?: string; channel?: string }): Promise<Contact> {
  const { data } = await api.post('/contacts', contact);
  return data.contact;
}

export async function getContactById(id: string): Promise<Contact> {
  const { data } = await api.get(`/contacts/${id}`);
  return data.contact;
}

export async function updateContact(id: string, contact: Partial<Contact>): Promise<Contact> {
  const { data } = await api.put(`/contacts/${id}`, contact);
  return data.contact;
}

export async function deleteContact(id: string): Promise<void> {
  await api.delete(`/contacts/${id}`);
}
