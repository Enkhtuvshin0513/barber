import { Router } from 'express';

export const router = Router();

router.post('/register', (req, res) => {
  res.send({ message: 'Review route' });
});

router.post('/login', (req, res) => {
  res.send({ message: 'Review route' });
});

router.post('/login', (req, res) => {
  res.send({ message: 'Review route' });
});

router.post('/logout', (req, res) => {
  res.send({ message: 'Review route' });
});

router.post('/change-password', (req, res) => {
  res.send({ message: 'Review route' });
});

router.post('/forget-password', (req, res) => {
  res.send({ message: 'Review route' });
});
