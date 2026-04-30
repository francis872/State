import { Request, Response } from 'express';
import * as propertyService from '../services/property.service';

export const createProperty = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const { title, price, location, type, status, bedrooms, bathrooms, area, description } = req.body;
    if (!title || !price || !location || !type) {
      return res.status(400).json({ message: 'title, price, location y type son requeridos.' });
    }
    const property = await propertyService.createProperty(organizationId, {
      title, price: Number(price), location, type, status,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      area: area ? Number(area) : undefined,
      description,
    });
    return res.status(201).json({ property });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProperties = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const properties = await propertyService.getProperties(organizationId);
    return res.json({ properties });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const { id } = req.params;
    const property = await propertyService.updateProperty(organizationId, id, req.body);
    return res.json({ property });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const { id } = req.params;
    await propertyService.deleteProperty(organizationId, id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const matchProperty = async (req: Request, res: Response) => {
  try {
    const { organizationId } = (req as any).user;
    const { leadId } = req.params;
    const matches = await propertyService.matchLeadToProperties(organizationId, leadId);
    return res.json({ matches });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
