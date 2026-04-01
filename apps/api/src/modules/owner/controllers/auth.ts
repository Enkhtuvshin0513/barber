import type { Request, Response } from 'express';
import { OwnerAuthService } from '../services/auth';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password required!!' });
  }

  try {
    await OwnerAuthService.register(email, password);

    res.json({ message: 'Successfully registered' });
  } catch (e: any) {
    res.status(400).send({ message: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password required!!' });
  }

  try {
    const authToken = await OwnerAuthService.login(email, password);

    res.json({ message: 'Success', data: { authToken } });
  } catch (e: any) {
    res.status(400).send({ message: e.message });
  }
};
