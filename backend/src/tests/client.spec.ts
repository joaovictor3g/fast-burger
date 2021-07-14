import connection from "../../src/database/connection";
import { app } from '../../src/server';
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
})