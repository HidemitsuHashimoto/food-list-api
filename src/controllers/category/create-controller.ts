import { FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../infra/db.ts'
import { Category } from '../../domain/category.ts'

export async function createController(req: FastifyRequest, res: FastifyReply) {
  try{
    const { name } = req.body as Category
    
    if(!name)
      return res.send({
        status: 400,
        message: 'Name is required!'
      })

      const data = await prisma.category.create({
        data: { name }
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