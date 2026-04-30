import axios from 'axios';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000' });

api.interceptors.request.use(cfg => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export type Plan = 'BASIC' | 'PRO' | 'ENTERPRISE';

export async function createCheckoutSession(plan: Plan): Promise<string> {
  const { data } = await api.post('/billing/checkout', { plan });
  return data.url as string;
}

export async function openBillingPortal(): Promise<string> {
  const { data } = await api.get('/billing/portal');
  return data.url as string;
}
