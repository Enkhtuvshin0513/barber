import { Router } from 'express';
import { router as ordersRouter } from './orders';
import { router as reviewRouter } from './reviews';
import { router as scheduleRouter } from './schedules';
import { router as serviceRouter } from './services';

export const ownerRouter = Router();

ownerRouter.use('/order', ordersRouter);
ownerRouter.use('/review', reviewRouter);
ownerRouter.use('/schedule', scheduleRouter);
ownerRouter.use('/service', serviceRouter);
