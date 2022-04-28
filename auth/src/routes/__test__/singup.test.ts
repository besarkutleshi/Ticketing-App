import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "besarkutleshi@outlook.com",
            password: "besar"
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "asd",
            password: "besar"
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "besarkutleshi@outlook.com",
            password: "a"
        })
        .expect(400);
});

it('disallow dupilcate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "besarkutleshi@outlook.com",
            password: "besar"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "besarkutleshi@outlook.com",
            password: "besar"
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "besarkutleshi@outlook.com",
            password: "besar"
        })
        .expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});