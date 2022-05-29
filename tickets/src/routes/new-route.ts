import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@bkorg/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
const router = express.Router();

router.post(
  '/api/tickets',
  [
    body('title').not().isEmpty().withMessage('Title is required!'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0!'),
  ],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = await Ticket.create({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    return res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
