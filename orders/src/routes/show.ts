import { NotAuthorizedError, NotFoundError, requireAuth } from '@bkorg/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const orderId = req.params.id;

    const order = await Order.findById(orderId).populate('ticket');
    if (!order) throw new NotFoundError();

    if (order.userId !== req.currentUser!.id)
      throw new NotAuthorizedError('Not authorized!');

    return res.status(200).send(order);
  }
);

export { router as showOrderRouter };
