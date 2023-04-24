import { createController } from "../controllers/category/create-controller.js";
import { findManyController } from "../controllers/category/find-many-controller.js";
import { updateController } from "../controllers/category/update-controller.js";
import { deleteController } from "../controllers/category/delete-controller.js";
export async function categoryRoutes(fastify) {
  fastify.get('/category', findManyController);
  fastify.post('/category', createController);
  fastify.put('/category/:id', updateController);
  fastify.delete('/category/:id', deleteController);
}