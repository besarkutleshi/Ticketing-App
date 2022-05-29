import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@bkorg/common';
import { createTicketRouter } from './routes/new-route';
import { showTicketRouter } from './routes/show';
import { indexRouter } from './routes';
import { updateTicker } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(errorHandler);
app.use(showTicketRouter);
app.use(indexRouter);
app.use(updateTicker);

app.all('*', () => {
  throw new NotFoundError();
});

export { app };
