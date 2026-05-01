import api from './api';

export interface Deal {
  id: string;
  title: string;
  value: number;
  probability: number;
  stage: string;
  contactId?: string;
  closeDate?: string;
  contact?: { id: string; name: string; channel: string };
}

export async function getDeals(): Promise<Deal[]> {
  const { data } = await api.get('/deals');
  return data.deals;
}

export async function createDeal(deal: Omit<Deal, 'id' | 'contact'>): Promise<Deal> {
  const { data } = await api.post('/deals', deal);
  return data.deal;
}

export async function updateDeal(id: string, deal: Partial<Deal>): Promise<Deal> {
  const { data } = await api.put(`/deals/${id}`, deal);
  return data.deal;
}

export async function changeDealStage(id: string, stage: string): Promise<Deal> {
  const { data } = await api.patch(`/deals/${id}/stage`, { stage });
  return data.deal;
}
