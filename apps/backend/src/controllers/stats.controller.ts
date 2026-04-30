import { Request, Response } from 'express';
import prisma from '../config/prisma';

// GET /stats — dashboard KPIs
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;

    const [
      totalContacts,
      activeDeals,
      deals,
      leads,
      messages,
    ] = await Promise.all([
      prisma.contact.count({ where: { organizationId } }),
      prisma.deal.count({ where: { organizationId, stage: { notIn: ['CERRADO_GANADO', 'CERRADO_PERDIDO', 'CLOSED_WON', 'CLOSED_LOST'] } } }),
      prisma.deal.findMany({ where: { organizationId }, select: { value: true, probability: true, stage: true, createdAt: true } }),
      prisma.lead.findMany({ where: { organizationId }, select: { status: true, score: true, createdAt: true } }),
      prisma.message.count({ where: { organizationId, direction: 'INBOUND', createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
    ]);

    // Pipeline value (sum of all active deals)
    const pipelineValue = deals
      .filter(d => !['CERRADO_GANADO', 'CERRADO_PERDIDO', 'CLOSED_WON', 'CLOSED_LOST'].includes(d.stage))
      .reduce((sum, d) => sum + d.value, 0);

    // Weighted forecast (value × probability/100)
    const weightedForecast = deals
      .filter(d => !['CERRADO_PERDIDO', 'CLOSED_LOST'].includes(d.stage))
      .reduce((sum, d) => sum + (d.value * d.probability) / 100, 0);

    // Won deals value
    const wonValue = deals
      .filter(d => ['CERRADO_GANADO', 'CLOSED_WON'].includes(d.stage))
      .reduce((sum, d) => sum + d.value, 0);

    // Conversion rate: won leads / total leads with activity
    const wonLeads = leads.filter(l => l.status === 'CLOSED_WON').length;
    const conversionRate = leads.length > 0 ? Math.round((wonLeads / leads.length) * 100) : 0;

    // Avg lead score
    const avgScore = leads.length > 0
      ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length)
      : 0;

    // Pipeline by stage
    const stageMap: Record<string, { count: number; value: number }> = {};
    for (const deal of deals) {
      if (!stageMap[deal.stage]) stageMap[deal.stage] = { count: 0, value: 0 };
      stageMap[deal.stage].count++;
      stageMap[deal.stage].value += deal.value;
    }

    return res.json({
      totalContacts,
      activeDeals,
      pipelineValue,
      weightedForecast,
      wonValue,
      conversionRate,
      avgScore,
      newMessagesThisWeek: messages,
      totalLeads: leads.length,
      stageBreakdown: stageMap,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /stats/forecast — 30/60/90 day revenue forecast
export const getForecast = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const deals = await prisma.deal.findMany({
      where: { organizationId, stage: { notIn: ['CERRADO_PERDIDO', 'CLOSED_LOST'] } },
      select: { value: true, probability: true, stage: true },
    });

    const baseWeighted = deals.reduce((sum, d) => sum + (d.value * d.probability) / 100, 0);

    // Simple compounding forecast by confidence tier
    return res.json({
      forecast30: Math.round(baseWeighted * 0.35),
      forecast60: Math.round(baseWeighted * 0.65),
      forecast90: Math.round(baseWeighted * 1.0),
      totalPipeline: deals.reduce((s, d) => s + d.value, 0),
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /stats/velocity — pipeline stage velocity in days
export const getVelocity = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const leads = await prisma.lead.findMany({
      where: { organizationId },
      select: { status: true, createdAt: true, updatedAt: true },
    });

    // Group by status, avg days since creation
    const grouped: Record<string, number[]> = {};
    for (const lead of leads) {
      const days = Math.floor((lead.updatedAt.getTime() - lead.createdAt.getTime()) / (1000 * 60 * 60 * 24));
      if (!grouped[lead.status]) grouped[lead.status] = [];
      grouped[lead.status].push(days);
    }

    const velocity = Object.entries(grouped).map(([stage, days]) => ({
      stage,
      avgDays: Math.round(days.reduce((a, b) => a + b, 0) / days.length),
      count: days.length,
    }));

    return res.json({ velocity });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
