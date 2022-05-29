import { BadRequestError, NotFoundError } from '@bkorg/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { body } from 'express-validator';
import {
  validateRequest,
  NotAuthorizedError,
  requireAuth,
} from '@bkorg/common';

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

    const update = await Ticket.updateOne({ id: id }, { title, price });

    return res.send(update);
  }
);

export { router as updateTicker };
