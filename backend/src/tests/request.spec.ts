import connection from "../database/connection";
import { app } from '../server';
import request from 'supertest';

describe('request', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();    
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should create a request', async() => {
    const response = await request(app)
      .post('/request')
      .send({
        status: 'DELIVERIED'
      });

    expect(response.status).toBe(201);
  });

  it('should get length of all existing requests', async() => {
    await request(app)
      .post('/request')
      .send({
        status: 'DELIVERIED'
      });
    
    await request(app)
      .post('/request')
      .send({
        status: 'AWAITING'
      });
    
    const response = await request(app)
      .get('/request');
    
    expect(response.body).toHaveLength(2);
  });

  it('should update a request by Id', async() => {
    const response = await request(app)
      .post('/request')
      .send({
        status: 'CREATING'
      });
    
    const requestId = response.body.id;

    const updated = await request(app)
      .put(`/requestUpdate/${requestId}`)
      .send({
        status: 'DELIVERIED'
      });

    expect(updated.body).toEqual({
      success: true,
      message: "Status do pedido atualizado com sucesso.",
    });
  });

});