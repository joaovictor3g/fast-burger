import { Request, Response } from "express";
import connection from "../database/connection";
import { v4 as uuidV4 } from "uuid";
import { validate } from "email-validator";

export const clientController = {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    if (!validate(email)) {
      res.status(400).json({ errorMessage: "E-mail inválido." });
    }

    try {
      const data = await connection("clients")
        .select("*")
        .from("clients")
        .where("email", email);

      if (data.length > 0) {
        return res
          .status(400)
          .json({ errorMessage: "Email já foi cadastrado." });
      }

      const [id] = await connection("clients")
        .insert({
          client_id: uuidV4(),
          name,
          email,
        })
        .returning("client_id");

      return res.status(201).json({ id });
    } catch (err) {
      throw new Error(err);
    }
  },

  async list(req: Request, res: Response) {
    try {
      const data = await connection("clients").select("*").from("clients");

      res.status(200).json({ count: data.length, data });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getByID(req: Request, res: Response) {
    const { id } = req.query;

    if(!id){
      return res
          .status(400)
          .json({errorMessage: "Id de cliente inválido."});
    }

    try {
      const data = await connection("clients")
        .select("*")
        .where("client_id", id as string);

        if(data.length === 0) {
          return res
          .status(404)
          .json({errorMessage: 'Cliente não encontrado.'});
        }

        return res
          .status(201)
          .json({data: data[0]});
    } catch (err) {
      return new Error(err);
    }
  },

  async getByEmail(req: Request, res: Response) {
    const { email } = req.query;

    if (!validate(email as string)) {
      res.status(400).json({ errorMessage: "E-mail inválido." });
    }

    try {
      const data = await connection("clients")
        .select("*")
        .where("email", email as string);

        if(data.length === 0) {
          return res
          .status(404)
          .json({errorMessage: 'Cliente não encontrado.'});
        }

        return res
          .status(201)
          .json({data: data[0]});
    } catch (err) {
      return new Error(err);
    }
  },

};
