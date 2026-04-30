import { Request, Response } from 'express';
import * as contactService from '../services/contact.service';

export const createContact = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { name, email, phone, channel } = req.body;
    if (!name) return res.status(400).json({ message: 'Nombre requerido.' });
    const contact = await contactService.createContact(user.userId, user.organizationId, { name, email, phone, channel });
    return res.status(201).json({ contact });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const contacts = await contactService.getContacts(user.organizationId);
    return res.status(200).json({ contacts });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getContactById = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const contact = await contactService.getContactById(user.organizationId, id);
    if (!contact) return res.status(404).json({ message: 'Contacto no encontrado' });
    return res.status(200).json({ contact });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { name, email, phone, channel } = req.body;
    const contact = await contactService.updateContact(user.organizationId, id, { name, email, phone, channel });
    return res.status(200).json({ contact });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    await contactService.deleteContact(user.organizationId, id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
