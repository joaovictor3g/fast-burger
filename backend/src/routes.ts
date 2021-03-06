import { Router } from "express";
import { clientController } from "./controllers/clientController";
import { clientRequestController } from "./controllers/clientRequestController";
import { igredientController } from "./controllers/ingredientController";
import { requestController } from "./controllers/requestController";
import { requestIngredientController } from "./controllers/requestIngredientsController";
import { sessionController } from "./controllers/sessionController";

const routes = Router();

routes.post("/client", clientController.create);
routes.get("/client", clientController.list);
routes.get("/clientById/:id", clientController.getByID);
routes.get("/clientByEmail/:email", clientController.getByEmail);

routes.post("/ingredient", igredientController.create);
routes.get("/ingredient", igredientController.list);
routes.get("/ingredientById/:id", igredientController.getByID);
routes.delete("/ingredientDelete/:id", igredientController.delete);
routes.put("/ingredientUpdate/:id", igredientController.update);
routes.get('/ingredient-by-type', igredientController.listByType);

routes.post("/request", requestController.create);
routes.get("/request", requestController.list);
routes.get("/requestById/:id", requestController.getByID);
routes.put("/requestUpdate/:id", requestController.update);

routes.post("/clientRequest", clientRequestController.create);
routes.get("/clientRequest", clientRequestController.list);
routes.get(
  "/clientRequestByClientId/:clientId",
  clientRequestController.getByClientID
);
routes.get(
  "/clientRequestAllByClientId/:clientId",
  clientRequestController.getAllByClientID
);
routes.delete(
  "/clientRequestDelete/:clientId/:requestId",
  clientRequestController.delete
);

routes.post("/requestIngredient", requestIngredientController.create);
routes.get("/requestIngredient", requestIngredientController.list);
routes.get(
  "/requestIngredientById/:requestId",
  requestIngredientController.getByRequesttID
);
routes.delete(
  "/requestIngredientDelete/:requestId/:ingredientId",
  requestIngredientController.deleteIngredient
);

routes.post('/session', sessionController.create);

export { routes };
