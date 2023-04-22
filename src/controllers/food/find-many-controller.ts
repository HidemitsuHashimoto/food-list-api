import { FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../infra/db.ts'

export async function findManyController(req: FastifyRequest, res: FastifyReply) {
  try{
    const data = await prisma.food.findMany()
    return res.send({
      status: 200,
      data
    })
  }catch(e) {
    return res.send(e)
  }
}