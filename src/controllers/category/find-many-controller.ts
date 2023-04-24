import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../infra/db";

export async function findManyController(
  _: FastifyRequest,
  res: FastifyReply
): Promise<any> {
  try {
    const data = await prisma.category.findMany();
    return res.send({
      status: 200,
      data,
    });
  } catch (e) {
    return res.send(e);
  }
}
