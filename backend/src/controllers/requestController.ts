import { Request, Response } from "express";
import connection from "../database/connection";
import { v4 as uuidV4 } from "uuid";

export const requestController = {
  async create(req: Request, res: Response) {
    const { status } = req.body;

    try {
      const [id] = await connection("requests")
        .insert({
          request_id: uuidV4(),
          created_at: new Date().toISOString(),
          status,
        })
        .returning("request_id");

      return res.status(201).json({ id });
    } catch (err) {
      throw new Error(err);
    }
  },

  async list(req: Request, res: Response) {
    try {
      const data = await connection("requests").select("*");

      res.status(200).json(data);
    } catch (err) {
      throw new Error(err);
    }
  },

  async getByID(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ errorMessage: "Id de pedido inválido." });
    }

    try {
      const data = await connection("requests")
        .select("*")
        .where("request_id", id)
        .first();

      res.status(200).json({ data });
    } catch (err) {
      return new Error(err);
    }
  },
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Id de pedido inválido." });
    }
    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status do pedido inválido." });
    }

    try {
      const data = await connection("requests")
        .select("*")
        .where("request_id", id)
        .first();

      if (!data) {
        return res.status(400).json({ errorMessage: "Pedido não encontrado." });
      }

      await connection("requests").update({ status }).where("request_id", id);

      return res
        .status(200)
        .json({
          success: true,
          message: "Status do pedido atualizado com sucesso.",
        });
    } catch (err) {
      return new Error(err);
    }
  },
};
