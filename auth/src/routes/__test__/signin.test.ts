import request from 'supertest'
import { app } from '../../app'

it('falis when an email that does not exists is supplied ', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'besarkutleshi@outlook.com',
            password: "besar"
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'besarkutleshi@outlook.com',
            password: "besar"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'besarkutleshi@outlook.com',
            password: "besarasd"
        })
        .expect(400);
});

it('responds with a cookie when a given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'besarkutleshi@outlook.com',
            password: "besar"
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'besarkutleshi@outlook.com',
            password: "besar"
        })
        .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
})