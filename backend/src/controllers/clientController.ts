import { Request, Response } from "express";
import connection from "../database/connection";
import { v4 as uuidV4 } from "uuid";
import { validate } from "email-validator";

export const clientController = {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!validate(email)) {
      res.status(400).json({ errorMessage: "E-mail inválido." });
    }

    try {
      const data = await connection("clients")
        .select("*")
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
          password
        })
        .returning("client_id");

      return res.status(201).json({ id });
    } catch (err) {
      throw new Error(err);
    }
  },

  async list(req: Request, res: Response) {
    try {
      const data = await connection("clients").select("*");

      res.status(200).json({ count: data.length, data });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getByID(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id de cliente inválido." });
    }

    try {
      const data = await connection("clients")
        .select("*")
        .where("client_id", id as string)
        .first();

      if (!data) {
        return res
          .status(404)
          .json({ success: false, message: "Cliente não encontrado." });
      }

      return res.status(201).json({ data });
    } catch (err) {
      return new Error(err);
    }
  },

  async getByEmail(req: Request, res: Response) {
    const { email } = req.params;

    if (!validate(email as string)) {
      res.status(400).json({ success: false, message: "E-mail inválido." });
    }

    try {
      const data = await connection("clients")
        .select("*")
        .where("email", email)
        .first();

      if (!data) {
        return res
          .status(404)
          .json({ success: false, message: "Cliente não encontrado." });
      }

      return res.status(201).json({ data });
    } catch (err) {
      return new Error(err);
    }
  },
};
