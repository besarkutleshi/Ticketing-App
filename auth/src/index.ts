import mongoose from 'mongoose';
import { app } from './app';
import { BadRequestError, DatabaseConnectionError} from '@bkorg/common';

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new BadRequestError('JWT_KEY must be defined');
    }
    if(!process.env.MONGO_URI){
        throw new BadRequestError('MONGO_URI must be defined');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb");
    } catch (error) {
        throw new DatabaseConnectionError('Failed to connect to database!');
    }
}

app.listen(3000, () => {
    console.log("Listening on port 3000"); 
});

start();