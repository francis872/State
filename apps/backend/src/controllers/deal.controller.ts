import { Request, Response } from 'express';
import * as dealService from '../services/deal.service';

export const createDeal = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { title, value, stage, probability, contactId, closeDate } = req.body;
    if (!title || !value || !stage || probability === undefined || !contactId) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
    const deal = await dealService.createDeal(user.userId, user.organizationId, { title, value, stage, probability: Number(probability), contactId, closeDate });
    return res.status(201).json({ deal });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getDeals = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const deals = await dealService.getDeals(user.organizationId);
    return res.status(200).json({ deals });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateDeal = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { title, value, stage, probability, contactId, closeDate } = req.body;
    const deal = await dealService.updateDeal(user.organizationId, id, { title, value, stage, probability: probability !== undefined ? Number(probability) : undefined, contactId, closeDate });
    return res.status(200).json({ deal });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteDeal = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    await dealService.deleteDeal(user.organizationId, id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const changeStage = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { stage } = req.body;
    if (!stage) return res.status(400).json({ message: 'Stage requerido.' });
    const deal = await dealService.changeStage(user.organizationId, id, stage);
    return res.status(200).json({ deal });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
