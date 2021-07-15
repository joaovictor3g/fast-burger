import connection from "../database/connection";
import { app } from '../server';
import request from 'supertest';

describe('student', () => {
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

  // it('should get a client by ID', async() => {
  //   await request(app)
  //     .post('/client')
  //     .send({
  //       name: 'João Victor',
  //       email: 'joao@gmail.com'
  //     });

    
  // });
})