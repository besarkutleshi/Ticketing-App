import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/siginup';
// import { errorHandler } from '../../common/src/middlewares/error.handler';
// import { NotFoundError } from '../../common/src/errors/not-found-error';
import cookieSession from 'cookie-session';

const { errorHandler, NotFoundError } = require('@bkorg/common');

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