import connection from "../database/connection";
import { app } from '../server';
import request from 'supertest';

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
      .send({
        name: 'João Victor',
        email: 'joao@gmail.com'
      })
    expect(response.status).toEqual(201);
  });

  it('should be error to create a client with same email', async() => {
    await request(app)
      .post('/client')
      .send({
        name: 'João Victor',
        email: 'joao@gmail.com'
      });

    const response = await request(app)
      .post('/client')
      .send({
        name: 'João Victor',
        email: 'joao@gmail.com'
      });
    expect(response.body).toEqual({ errorMessage: 'Email já foi cadastrado.' })
  });

  it('should not create a client with wrong email format', async() => {
    const response = await request(app)
      .post('/client')
      .send({
        name: 'João Victor',
        email: 'joao'
      });
    expect(response.body).toEqual({ errorMessage: 'E-mail inválido.' });
  });
  
  it('should get client by id', async() => {
    const response = await request(app)
      .post('/client')
      .send({
        name: 'João Victor',
        email: 'joao@gmail.com'
      });
    
    const clientId = response.body.id;
    
    const client = await request(app)
      .get(`/clientById/${clientId}`);

    expect(client.body).toHaveProperty('name', 'João Victor');
    expect(client.body).toHaveProperty('email', 'joao@gmail.com');
    expect(client.body).toHaveProperty('client_id', clientId);
  })
})