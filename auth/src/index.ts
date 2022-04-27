import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/siginup';
import { errorHandler } from './middlewares/error.handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler)

app.all('*', () => {
    throw new NotFoundError();
})

app.listen(3000, () => {
    console.log("Listening on port 3000"); 
});