import request from 'supertest';
import { app } from '../../app';


const payload = {
  email: 'some@gmail.com',
  password: 'password'
}

it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send(payload)
    .expect(400)
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send(payload)
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: payload.email,
      password: 'incorrect'
    })
    .expect(400)
})

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send(payload)
    .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send(payload)
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})

