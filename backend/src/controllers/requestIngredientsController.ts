import { Request, Response } from "express";
import connection from "../database/connection";

export const requestIngredientController = {
  async create(req: Request, res: Response) {
    const { requestId, ingredientId } = req.body;

    if (!requestId)
      return res
        .status(400)
        .json({ success: false, message: "Id de pedido inválido." });

    if (!ingredientId)
      return res
        .status(400)
        .json({ success: false, message: "Id de ingrediente inválido." });

    try {
      const storedRequestId = await connection("requests")
        .select("request_id")
        .where("request_id", requestId)
        .first();

      if (!storedRequestId)
        return res
          .status(404)
          .json({ success: false, message: "Pedido não encontrado." });

      const storedIngredientId = await connection("ingredients")
        .select("ingredient_id")
        .where("ingredient_id", ingredientId)
        .first();

      if (!storedIngredientId)
        return res
          .status(404)
          .json({ success: false, message: "Ingrediente não cadastrado." });

      const storedIngReq = await connection("request_ingredients")
        .where("ingredient_id", ingredientId).andWhere('request_id', requestId)
        .first();

      if (storedIngReq) {
        return res
          .status(400)
          .json({ success: false, message: "Pedido já possui o ingrediente." });
      }

      const [id] = await connection("request_ingredients")
        .insert({
          request_id: requestId,
          ingredient_id: ingredientId,
        })
        .returning("request_ingredients_id");

      return res.status(201).json({ id });
    } catch (err) {
      throw new Error(err);
    }
  },

  async list(req: Request, res: Response) {
    try {
      const data = await connection("request_ingredients").select("*");

      res.status(200).json({ count: data.length, data });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getByRequesttID(req: Request, res: Response) {
    const { requestId } = req.params;

    if (!requestId) {
      return res
        .status(400)
        .json({ success: false, message: "Id de cliente inválido." });
    }

    try {
      const storedRequest = await connection("requests")
        .select("*")
        .where("request_id", requestId)
        .first();

      if (!storedRequest) {
        return res
          .status(404)
          .json({ success: false, message: "Cliente não cadastrado." });
      }

      const status = storedRequest.status;

      const subquery = connection("request_ingredients")
        .select("ingredient_id")
        .where("request_id", requestId);

      const requestIngredientsData = await connection("ingredients")
        .select("*")
        .whereIn("ingredient_id", subquery);

      res.status(200).json({
        success: true,
        status,
        ingredients: {
          count: requestIngredientsData.length,
          data: requestIngredientsData,
        },
      });
    } catch (err) {
      return new Error(err);
    }
  },

  async deleteIngredient(req: Request, res: Response) {
    const { requestId, ingredientId } = req.params;

    try {
      const storedRequestId = await connection("requests")
        .select("request_id")
        .where("request_id", requestId)
        .first();

      if (!storedRequestId) {
        return res
          .status(404)
          .json({ success: false, message: "Pedido não cadastrado." });
      }

      const storedIngredientId = await connection("request_ingredients")
        .select("ingredient_id")
        .where("ingredient_id", ingredientId)
        .first();

      if (!storedIngredientId) {
        return res
          .status(404)
          .json({ success: false, message: "Pedido não encontrado." });
      }

      /* await connection("client_requests")
        .delete()
        .where("request_id", requestId);

      await connection("requests").delete().where("request_id", requestId); */

      res
        .status(200)
        .json({ success: true, message: "Pedido removido com sucesso." });
    } catch (err) {
      return new Error(err);
    }
  },
};
