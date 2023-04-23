import { createController } from '../controllers/food/create-controller.ts';
import { deleteController } from '../controllers/food/delete-controller.ts';
import { findManyController } from '../controllers/food/find-many-controller.ts';
import { FastifyInstance } from "fastify";
import { updateController } from '../controllers/food/update-controller.ts';
import { findByCategoryController } from '../controllers/food/find-by-category-controller.ts';
import { findByTextController } from '../controllers/food/find-by-text-controller.ts';

export async function foodRoutes(fastify: FastifyInstance) {
  fastify.get('/food', findManyController)
  fastify.get('/food/:categoryId', findByCategoryController)
  fastify.post('/food', createController)
  fastify.get('/food/filter', findByTextController)
  fastify.put('/food/:id', updateController)
  fastify.delete('/food/:id', deleteController)
}