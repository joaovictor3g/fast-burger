import connection from "../database/connection";
import { app } from '../server';
import request from 'supertest';

describe('client made a request', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should create a request related a client', async() => {
    const client = await request(app)
      .post('/client')
      .send({
        name: 'João Victor', 
        email: 'joao@gmail.com'
      });

    const requestBody = await request(app)
      .post('/request')
      .send({
        status: 'CREATING'
      });
    
    const clientId = client.body.id;
    const requestId = requestBody.body.id;

    const response = await request(app)
      .post('/clientRequest')
      .send({
        clientId,
        requestId
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: response.body.id
    });
  });

  it('should get request by id client', async() => {
    const client = await request(app)
      .post('/client')
      .send({
        name: 'João Victor', 
        email: 'joao@gmail.com'
      });

    await request(app)
      .post('/request')
      .send({
        status: 'DELIVERIED'
      });
    
    const clientId = client.body.id;
    
    const response = await request(app)
      .get(`/clientRequestByClientId/${clientId}`);

    expect(response.status).toBe(200);
  });

  it('should delete a client request', async() => {
    const client = await request(app)
      .post('/client')
      .send({
        name: 'João Victor', 
        email: 'joao@gmail.com'
      });

    const requestBody = await request(app)
      .post('/request')
      .send({
        status: 'CREATING'
      });
    
    const clientId = client.body.id;
    const requestId = requestBody.body.id;

    await request(app)
      .post('/clientRequest')
      .send({
        clientId,
        requestId
      })

    const response = await request(app)
      .delete(`/clientRequestDelete/${clientId}/${requestId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ 
      success: true, 
      message: "Pedido removido com sucesso." 
    });
  });
});