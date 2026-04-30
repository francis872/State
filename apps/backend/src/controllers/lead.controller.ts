import { Request, Response } from 'express';
import * as leadService from '../services/lead.service';

export const getLeads = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const leads = await leadService.getLeadsByOrg(organizationId);
    return res.json({ leads });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const recalculateScores = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const updated = await leadService.recalculateScores(organizationId);
    return res.json({ updated: updated.length, message: 'Scores recalculados correctamente' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'status requerido' });
    const lead = await leadService.updateLeadStatus(organizationId, id, status);
    return res.json({ lead });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
