import request from 'supertest';
import { app } from '../../app';

it('can fetch a list of tickets', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'Conecrt', price: 20 })
    .expect(201);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'Conecrt1', price: 21 })
    .expect(201);

  const response = await request(app).get('/api/tickets').send().expect(200);

  expect(response.body.length).toEqual(2);
});
