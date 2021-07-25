import connection from "../database/connection";
import { app } from '../server';
import request from 'supertest';

const client = {
  name: 'João Victor',
  email: 'joao@gmail.com',
  password: '123',
}

describe('client', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should create a client', async() => {
    const response = await request(app)
      .post('/client')
      .send(client)
    expect(response.status).toEqual(201);
  });

  it('should be error to create a client with same email', async() => {
    await request(app)
      .post('/client')
      .send(client);

    const response = await request(app)
      .post('/client')
      .send(client);
    expect(response.body).toEqual({ errorMessage: 'Email já foi cadastrado.' })
  });

  it('should not create a client with wrong email format', async() => {
    const response = await request(app)
      .post('/client')
      .send({
        name: 'Joao',
        email: 'emailnoformatoerrado',
        password: '123'
      });
    expect(response.body).toEqual({ errorMessage: 'E-mail inválido.' });
  });
});