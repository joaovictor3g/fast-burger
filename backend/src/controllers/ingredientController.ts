import { Request, Response } from "express";
import connection from "../database/connection";

export const igredientController = {
  async create(req: Request, res: Response) {
    const { name, amount, type } = req.body;

    try {
      const [id] = await connection("ingredients")
        .insert({
          name,
          amount,
          type,
        })
        .returning("ingredient_id");

      return res.status(201).json({ id });
    } catch (err) {
      throw new Error(err);
    }
  },

  async list(req: Request, res: Response) {
    try {
      const data = await connection("ingredients")
        .select("*")
        .from("ingredients");

      res.status(200).json(data);
    } catch (err) {
      throw new Error(err);
    }
  },

  async getByID(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id de ingrediente inválido." });
    }

    try {
      const data = await connection("ingredients")
        .select("*")
        .from("ingredients")
        .where("ingredient_id", id)
        .first();

      if (!data) {
        return res
          .status(404)
          .json({ success: false, message: "Ingrediente não encontrado." });
      }

      res.status(200).json(data);
    } catch (err) {
      return new Error(err);
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const storedIngredientId = await connection("ingredients")
        .select("ingredient_id")
        .where("ingredient_id", id)
        .first();

      if (!storedIngredientId) {
        return res
          .status(404)
          .json({ success: false, message: "Ingrediente não encontrado." });
      }

      await connection("ingredients").delete().where("ingredient_id", id);

      res
        .status(200)
        .json({ success: true, message: "Ingrediente removido com sucesso." });
    } catch (err) {
      return new Error(err);
    }
  },


  async listByType(req: Request, res: Response) {
    const { type } = req.query;

    try {
      const response = await connection('ingredients')
        .select('*')
        .where('type', String(type));

      return res.status(200).json(response);
    } catch(err) {
      return new Error(err);
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, amount, type } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Nome do ingrediente inválido." });
    }
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Quantidade do ingrediente inválido.",
      });
    }
    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Tipo do ingrediente inválido.",
      });
    }
    try {
      const storedIngredientId = await connection("ingredients")
        .select("ingredient_id")
        .where("ingredient_id", id)
        .first();

      if (!storedIngredientId) {
        return res
          .status(404)
          .json({ success: false, message: "Ingrediente não encontrado." });
      }

      await connection("ingredients")
        .update({ name, amount, type })
        .where("ingredient_id", id);

      res.status(204).json({
        success: true,
        message: "Ingrediente atualizado com sucesso.",
      });
    } catch (err) {
      return new Error(err);
    }
  },
};
