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
          .json({errorMessage: "Id de ingrediente inválido."});
    }

    try {
      const data = await connection("ingredients")
        .select("*")
        .from('ingredients')
        .where("ingredient_id", id as string);
        console.log(data)

      res.status(200).json({ data: data[0] });
    } catch (err) {
      return new Error(err);
    }
  },
};
