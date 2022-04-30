import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/siginup';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@bkorg/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler)

app.all('*', () => {
    throw new NotFoundError();
})

export { app };