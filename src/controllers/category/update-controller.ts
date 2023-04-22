import { Prisma } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../infra/db.ts'

export async function updateController(req: FastifyRequest, res: FastifyReply) {
  try{
    const { id } = req.params as { id: string }
    const { name } = req.body as { name: string }
    
    if(!id)
      return res.send({
        status: 400,
        message: 'ID is required!'
      })

    if(!name)
      return res.send({
        status: 400,
        message: 'Name is required!'
      })

      const data = await prisma.category.update({
        where: { id },
        data: { name }
      })
      res.send({
        status: 200,
        message: `The category ${data.name} is updated!`
      })
  }catch(e) {
    if(e instanceof Prisma.PrismaClientKnownRequestError) {
      if(e.code === 'P2025')
        return res.send({
          status: 404,
          message: 'The category does not exist.'
        })
    }

    return res.send({
      status: 500,
      message: 'Unexpected error!'
    })
  }
}