import { Prisma } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../infra/db.ts'

export async function updateController(req: FastifyRequest, res: FastifyReply) {
  try{
    const { id } = req.params as { id: string }
    const { name, description } = req.body as { name?: string, description?: string }
    
    if(!id)
      return res.send({
        status: 400,
        message: 'ID is required!'
      })

    if(!name && !description)
      return res.send({
        status: 400,
        message: 'Name or Description is required!'
      })

      const newData: any = {}

      if(name)
        newData['name'] = name

      if(description)
        newData['description'] = description

      const data = await prisma.food.update({
        where: { id },
        data: { ...newData }
      })
      res.send({
        status: 200,
        message: `The food ${data.name} is updated!`
      })
  }catch(e) {
    if(e instanceof Prisma.PrismaClientKnownRequestError) {
      if(e.code === 'P2025')
        return res.send({
          status: 404,
          message: 'The food does not exist.'
        })
    }

    return res.send({
      status: 500,
      message: 'Unexpected error!'
    })
  }
}