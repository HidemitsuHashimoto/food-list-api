import { FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../infra/db.ts'

enum SearchBy {
  category = 'category',
  name = 'name',
}

export async function findByTextController(req: FastifyRequest, res: FastifyReply) {
  try{
    const { search_by, search_text } = req.query as { search_by: 'category' | 'name', search_text: string }

    if(!search_by)
      return res.send({
        status: 400,
        message: 'Search by is required!'
      })

    if(!(search_by in SearchBy))
      return res.send({
        status: 400,
        message: 'Search by type is invalid!'
      })

    const data = await prisma.food.findMany({
      where: {
        name: search_by === SearchBy.name ? {
          contains: search_text
        } : undefined,
        categories: search_by === SearchBy.category ? {
          every: {
            category: {
              name: {
                contains: search_text
              }
            }
          }
        } : undefined
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
      data,
    })
  }catch(e) {
    return res.send(e)
  }
}