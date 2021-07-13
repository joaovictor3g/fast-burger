import { Request, Response } from 'express';
import connection from '../database/connection';
import { v4 as uuidV4 } from 'uuid'

export const clientController = {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    try {
      const [id] = await connection('clients')
        .insert({
          client_id: uuidV4(),
          name,
          email
        }).returning('client_id');

      return res.status(201).json({ id });

    } catch(err) {
      throw new Error(err);
    }
  },
};