import { Router } from "express";
import { clientController } from "./controllers/clientController";
import { igredientController } from "./controllers/ingredientController";

const routes = Router();

routes.post("/client", clientController.create);
routes.get("/client", clientController.list);
routes.get("/clientById", clientController.getByID);
routes.get("/clientByEmail", clientController.getByEmail);

routes.post("/ingredient", igredientController.create);
routes.get("/ingredient", igredientController.list);
routes.get("/ingredientById", igredientController.getByID);

export { routes };
