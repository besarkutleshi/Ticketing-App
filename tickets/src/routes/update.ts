import { BadRequestError, NotFoundError } from '@bkorg/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { body } from 'express-validator';
import {
  validateRequest,
  NotAuthorizedError,
  requireAuth,
} from '@bkorg/common';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required!'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const id = req.params.id;
    const ticket = await Ticket.findById(id);

    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== req.currentUser?.id) throw new NotAuthorizedError('');

    ticket.set({
      title: title,
      price: price,
    });
    await ticket.save();

    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: id,
      title: title,
      price: price,
      userId: ticket.userId,
    });

    return res.send(ticket);
  }
);

export { router as updateTicker };
