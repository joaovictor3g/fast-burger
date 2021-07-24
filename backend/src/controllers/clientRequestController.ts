import { Request, Response } from "express";
import connection from "../database/connection";

export const clientRequestController = {
  async create(req: Request, res: Response) {
    const { clientId, requestId } = req.body;

    if (!clientId)
      return res
        .status(400)
        .json({ success: false, message: "Id de cliente inválido." });

    if (!requestId)
      return res
        .status(400)
        .json({ success: false, message: "Id de pedido inválido." });

    try {
      const storedClientId = await connection("clients")
        .select("client_id")
        .where("client_id", clientId)
        .first();

      if (!storedClientId)
        return res
          .status(404)
          .json({ success: false, message: "Cliente não cadastrado." });

      const storedRequestId = await connection("requests")
        .select("request_id")
        .where("request_id", requestId)
        .first();

      if (!storedRequestId)
        return res
          .status(404)
          .json({ success: false, message: "Pedido não cadastrado." });

      const [id] = await connection("client_requests")
        .insert({
          client_id: clientId,
          request_id: requestId,
        })
        .returning("client_request_id");

      return res.status(201).json({ id });
    } catch (err) {
      throw new Error(err);
    }
  },

  async list(req: Request, res: Response) {
    try {
      const data = await connection("client_requests").select("*");

      res.status(200).json({ count: data.length, data });
    } catch (err) {
      throw new Error(err);
    }
  },

  async getByClientID(req: Request, res: Response) {
    const { clientId } = req.params;

    if (!clientId) {
      return res
        .status(400)
        .json({ success: false, message: "Id de cliente inválido." });
    }

    try {
      const storedClientId = await connection("clients")
        .select("client_id")
        .where("client_id", clientId)
        .first();

      if (!storedClientId) {
        return res
          .status(404)
          .json({ success: false, message: "Cliente não cadastrado." });
      }

      const name = await connection("clients")
        .select("name")
        .where("client_id", clientId)
        .first();

      const requestData: { request_id: string } = await connection(
        "client_requests"
      )
        .select("request_id")
        .where("client_id", clientId)
        .first();

      const requestId = requestData.request_id;

      const requestIngredientData = await connection("request_ingredients")
        .join(
          "requests",
          "requests.request_id",
          "request_ingredients.request_id"
        )
        .join(
          "ingredients",
          "ingredients.ingredient_id",
          "request_ingredients.ingredient_id"
        )
        .where("request_ingredients.request_id", requestId)
        .select("ingredients.*", "requests.*");

      return res.status(200).json({
        success: true,
        name: name.name,
        count: requestIngredientData.length,
        data: requestIngredientData,
      });
    } catch (err) {
      return new Error(err);
    }
  },

  async getAllByClientID(req: Request, res: Response) {
    const { clientId } = req.params;

    if (!clientId) {
      return res
        .status(400)
        .json({ success: false, message: "Id de cliente inválido." });
    }

    try {
      const storedClientId = await connection("clients")
        .select("client_id")
        .where("client_id", clientId)
        .first();

      if (!storedClientId) {
        return res
          .status(404)
          .json({ success: false, message: "Cliente não cadastrado." });
      }

      const name = await connection("clients")
        .select("name")
        .where("client_id", clientId)
        .first();

      const requestData = await connection("client_requests")
        .select("request_id")
        .where("client_id", clientId);

      const requestIngredientData = await connection("request_ingredients")
        .join(
          "requests",
          "requests.request_id",
          "request_ingredients.request_id"
        )
        .join(
          "ingredients",
          "ingredients.ingredient_id",
          "request_ingredients.ingredient_id"
        )
        .whereIn(
          "request_ingredients.request_id",
          requestData.map((r) => r.request_id)
        )
        .select("ingredients.*", "requests.*");

      const parsedRequest = requestData.map((reqId) => {
        const ing = requestIngredientData.filter(
          (ingredient) => ingredient.request_id === reqId.request_id
        );
        return {
          request: ing,
        };
      });

      return res.status(200).json({
        success: true,
        name: name.name,
        count: parsedRequest.length,
        data: parsedRequest,
      });
    } catch (err) {
      return new Error(err);
    }
  },

  async delete(req: Request, res: Response) {
    const { clientId, requestId } = req.params;

    try {
      const storedClientId = await connection("clients")
        .select("client_id")
        .where("client_id", clientId)
        .first();

      if (!storedClientId) {
        return res
          .status(404)
          .json({ success: false, message: "Cliente não cadastrado." });
      }

      const storedRequestId = await connection("client_requests")
        .select("request_id")
        .where("request_id", requestId)
        .first();

      if (!storedRequestId) {
        return res
          .status(404)
          .json({ success: false, message: "Pedido não encontrado." });
      }

      await connection("client_requests")
        .delete()
        .where("request_id", requestId);

      await connection("requests").delete().where("request_id", requestId);

      res
        .status(200)
        .json({ success: true, message: "Pedido removido com sucesso." });
    } catch (err) {
      return new Error(err);
    }
  },
};
