import mongoose from 'mongoose';
import { app } from './app';
const { BadRequestError, DatabaseConnectionError} = require('@bkorg/common');

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