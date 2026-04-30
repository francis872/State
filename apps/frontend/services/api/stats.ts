import api from './api';

export interface DashboardStats {
  totalContacts: number;
  activeDeals: number;
  pipelineValue: number;
  weightedForecast: number;
  wonValue: number;
  conversionRate: number;
  avgScore: number;
  newMessagesThisWeek: number;
  totalLeads: number;
  stageBreakdown: Record<string, { count: number; value: number }>;
}

export interface ForecastData {
  forecast30: number;
  forecast60: number;
  forecast90: number;
  totalPipeline: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data } = await api.get('/stats');
  return data;
}

export async function getForecast(): Promise<ForecastData> {
  const { data } = await api.get('/stats/forecast');
  return data;
}

export async function getVelocity() {
  const { data } = await api.get('/stats/velocity');
  return data.velocity;
}

export async function getActivity() {
  const { data } = await api.get('/activity');
  return data.activities;
}
