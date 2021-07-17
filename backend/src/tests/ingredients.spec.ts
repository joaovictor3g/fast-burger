import connection from "../database/connection";
import { app } from '../server';
import request from 'supertest';

describe('ingredients', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
    
    // Criando um ingrediente antes de cada teste
    await request(app)
      .post('/ingredient')
      .send({
        name: 'Hambúrger',
        amount: 1,
        type: 'Burger'
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should create an ingredient', async() => {
    const ingredientCreated = await request(app)
      .post('/ingredient')
      .send({
        name: 'Hambúrger',
        amount: 1,
        type: 'Burger'
      });

    expect(ingredientCreated.status).toEqual(201);
  });

  it('should list ingredients and return status 200', async() => {
    const response = await request(app)
      .get('/ingredient');

    expect(response.status).toBe(200);
  });

  it('it should delete an ingredient passind id', async () => {
    const response = await request(app)
      .delete('/ingredientDelete/1');

    expect(response.body).toHaveProperty('success', true);
  });

  it('should update an ingredient', async () => {
    const response = await request(app)
      .put('/ingredientUpdate/1')
      .send({
        name: 'Hambúrger',
        amount: 3,
        type: 'Burger'
      });

    expect(response.status).toBe(204);
  });
})