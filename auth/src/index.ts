import express from 'express'
import {json} from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/siginup';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.listen(3000, () => {
    console.log("Listening on port 3000"); 
});