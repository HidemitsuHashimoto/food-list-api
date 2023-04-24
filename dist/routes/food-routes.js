import { createController } from "../controllers/food/create-controller.js";
import { deleteController } from "../controllers/food/delete-controller.js";
import { findManyController } from "../controllers/food/find-many-controller.js";
import { updateController } from "../controllers/food/update-controller.js";
import { findByCategoryController } from "../controllers/food/find-by-category-controller.js";
import { findByTextController } from "../controllers/food/find-by-text-controller.js";
export async function foodRoutes(fastify) {
  fastify.get('/food', findManyController);
  fastify.get('/food/:categoryId', findByCategoryController);
  fastify.post('/food', createController);
  fastify.get('/food/filter', findByTextController);
  fastify.put('/food/:id', updateController);
  fastify.delete('/food/:id', deleteController);
}