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
        name: "Pão brioche",
        description: "Um pão para os melhores dias da sua vida.",
        amount: 100,
        price: 2.5,
        type: "Pão",
        image_url: "https://www.aryzta.com.br/wp-content/uploads/2017/10/pao_brioche_max-1.jpg",
      },);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should create an ingredient', async() => {
    const ingredientCreated = await request(app)
      .post('/ingredient')
      .send({
        name: "Pão brioche",
        description: "Um pão para os melhores dias da sua vida.",
        amount: 100,
        price: 2.5,
        type: "Pão",
        image_url: "https://www.aryzta.com.br/wp-content/uploads/2017/10/pao_brioche_max-1.jpg",
      },);

    expect(ingredientCreated.status).toEqual(201);
  });

  it('should list ingredients and return status 200', async() => {
    const response = await request(app)
      .get('/ingredient');

    expect(response.status).toBe(200);
  });

  it('should delete an ingredient passind id', async () => {
    const response = await request(app)
      .delete('/ingredientDelete/1');

    expect(response.body).toHaveProperty('success', true);
  });

  it('should update an ingredient', async () => {
    const response = await request(app)
      .put('/ingredientUpdate/1')
      .send({
        name: "Pão brioche",
        description: "Um pão para os melhores dias da sua vida.",
        amount: 100,
        price: 2.5,
        type: "Pão",
        image_url: "https://www.aryzta.com.br/wp-content/uploads/2017/10/pao_brioche_max-1.jpg",
      },);

    expect(response.status).toBe(204);
  });
})