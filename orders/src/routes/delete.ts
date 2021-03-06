import { NotAuthorizedError, NotFoundError, requireAuth } from '@bkorg/common';
import express, { Request, Response } from 'express';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

router.delete(
  '/api/orders/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) throw new NotFoundError();

    if (order.userId !== req.currentUser?.id)
      throw new NotAuthorizedError('Not authorized');

    order.status = OrderStatus.Cancelled;
    await order.save();

    return res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
