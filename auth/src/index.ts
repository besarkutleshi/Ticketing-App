import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/siginup';
import { errorHandler } from './middlewares/error.handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { DatabaseConnectionError } from './errors/database-connection';
import { BadRequestError } from './errors/bad-request-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler)

app.all('*', () => {
    throw new NotFoundError();
})

const start = async () => {

    if(!process.env.JWT_KEY){
        throw new BadRequestError('JWT_KEY must be defined');
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("Connected to MongoDb");
    } catch (error) {
        throw new DatabaseConnectionError('Failed to connect to database!');
    }
}

app.listen(3000, () => {
    console.log("Listening on port 3000"); 
});

start();