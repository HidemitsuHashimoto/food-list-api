import { FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../infra/db.ts'
import { Food } from '../../domain/food.ts'

export async function createController(req: FastifyRequest, res: FastifyReply) {
  try{
    const { name, description } = req.body as Food
    
    if(!name)
      return res.send({
        status: 400,
        message: 'Name is required!'
      })

      const data = await prisma.food.create({
        data: {
          name,
          description
        }
      })
      res.send({
        status: 200,
        data
      })
  }catch(e) {
    return res.send({
      status: 500,
      message: 'Unexpected error!'
    })
  }
}