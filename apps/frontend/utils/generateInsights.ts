// apps/frontend/utils/generateInsights.ts
import { differenceInDays } from 'date-fns';

export type Insight = {
  message: string;
  priority: 'high' | 'medium' | 'low';
};

export function generateInsights(deals: Array<{
  stage: string;
  probability: number;
  value: number;
  updatedAt: string | Date;
}>): Insight[] {
  const insights: Insight[] = [];
  const now = new Date();

  for (const deal of deals) {
    // Regla 1: Listo para cerrar
    if (deal.stage === 'negociacion' && deal.probability > 70) {
      insights.push({
        message: 'Este cliente está listo para cerrar. Actúa hoy.',
        priority: 'high',
      });
    }
    // Regla 2: Lead enfriándose
    if (differenceInDays(now, new Date(deal.updatedAt)) > 3) {
      insights.push({
        message: 'Este lead se está enfriando',
        priority: 'medium',
      });
    }
    // Regla 3: Alto valor
    if (deal.value > 10000) {
      insights.push({
        message: 'Oportunidad de alto valor',
        priority: 'high',
      });
    }
    // Regla 4: Lead frío
    if (deal.stage === 'lead' && deal.probability < 30) {
      insights.push({
        message: 'Lead frío, requiere seguimiento',
        priority: 'low',
      });
    }
  }

  // Eliminar duplicados por mensaje
  const unique = Array.from(new Map(insights.map(i => [i.message, i])).values());
  // Máximo 5 insights
  return unique.slice(0, 5);
}
