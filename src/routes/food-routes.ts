import { FastifyInstance } from "fastify";
import { createController } from "../controllers/food/create-controller";
import { deleteController } from "../controllers/food/delete-controller";
import { findByCategoryController } from "../controllers/food/find-by-category-controller";
import { findByTextController } from "../controllers/food/find-by-text-controller";
import { findManyController } from "../controllers/food/find-many-controller";
import { updateController } from "../controllers/food/update-controller";

export async function foodRoutes(fastify: FastifyInstance) {
  fastify.get("/food", findManyController);
  fastify.get("/food/:categoryId", findByCategoryController);
  fastify.post("/food", createController);
  fastify.get("/food/filter", findByTextController);
  fastify.put("/food/:id", updateController);
  fastify.delete("/food/:id", deleteController);
}
