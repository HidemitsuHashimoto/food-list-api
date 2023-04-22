import { createController } from '../controllers/food/create-controller.ts';
import { deleteController } from '../controllers/food/delete-controller.ts';
import { findManyController } from '../controllers/food/find-many-controller.ts';
import { FastifyInstance } from "fastify";
import { updateController } from '../controllers/food/update-controller.ts';

export async function foodRoutes(fastify: FastifyInstance) {
  fastify.get('/food', findManyController)
  fastify.post('/food', createController)
  fastify.put('/food/:id', updateController)
  fastify.delete('/food/:id', deleteController)
}