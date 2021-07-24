import { Request, Response } from 'express';
import connection from '../database/connection';

export const sessionController = {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    
    try {
      const response = await connection('clients')
        .where('email', email)
        .where('password', password)
        .select('client_id')
        .first();

      if(!response) 
        return res.status(404).json({ error: 'User not found' })

      return res.status(200).json(response);
      
    } catch(err) {
      return res.status(400).json({ error: 'Falha na comunicação com o banco' })
    }
  }
}