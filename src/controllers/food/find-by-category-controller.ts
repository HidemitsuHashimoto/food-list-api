import { FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../infra/db.ts'

export async function findByCategoryController(req: FastifyRequest, res: FastifyReply) {
  try{
    const { categoryId } = req.params as { categoryId: string }

    const data = await prisma.food.findMany({
      where: {
        categories: {
          every: {
            AND: {
              categoryId
            }
          }
        }
      },
      include: {
        categories: {
          select: {
            category: true
          }
        }
      }
    })
    return res.send({
      status: 200,
      data
    })
  }catch(e) {
    return res.send(e)
  }
}