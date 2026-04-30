export type Deal = {
  id: string;
  title: string;
  value: number;
  probability: number;
  stage: string;
};

export const stages = [
  'Lead',
  'Contacto',
  'Visita',
  'Negociación',
  'Cerrado',
];

export const mockDeals: Deal[] = [
  { id: '1', title: 'Acme Corp', value: 12000, probability: 80, stage: 'Lead' },
  { id: '2', title: 'Globex', value: 8000, probability: 60, stage: 'Contacto' },
  { id: '3', title: 'Soylent', value: 15000, probability: 90, stage: 'Visita' },
  { id: '4', title: 'Initech', value: 5000, probability: 40, stage: 'Lead' },
  { id: '5', title: 'Umbrella', value: 20000, probability: 95, stage: 'Negociación' },
  { id: '6', title: 'Wayne', value: 7000, probability: 50, stage: 'Contacto' },
  { id: '7', title: 'Stark', value: 30000, probability: 100, stage: 'Cerrado' },
];
