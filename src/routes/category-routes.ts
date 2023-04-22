import { FastifyInstance } from "fastify";
import { createController } from '../controllers/category/create-controller.ts';
import { findManyController } from "../controllers/category/find-many-controller.ts";
import { updateController } from "../controllers/category/update-controller.ts";
import { deleteController } from "../controllers/category/delete-controller.ts";

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.get('/category', findManyController)
  fastify.post('/category', createController)
  fastify.put('/category/:id', updateController)
  fastify.delete('/category/:id', deleteController)
}