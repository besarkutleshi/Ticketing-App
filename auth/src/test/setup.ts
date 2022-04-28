import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest';
import mongoose from 'mongoose'
import { app } from '../app'

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'
    mongo = new MongoMemoryServer();
    await mongo.start();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});


global.signin = async () => {
    const email = "besarkutleshi@outlook.com"
    const password = "besar"
    
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: email,
            password: password
        })
        .expect(201);
    const cookie = response.get('Set-Cookie');
    return cookie;
}