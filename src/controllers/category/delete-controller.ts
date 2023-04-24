import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../infra/db";

export async function deleteController(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };

    if (!id)
      return res.send({
        status: 400,
        message: "ID is required!",
      });

    const deletedRelated = prisma.categoriesOnFoods.deleteMany({
      where: {
        categoryId: id,
      },
    });
    const deletedCategory = prisma.category.delete({
      where: { id },
    });

    const transaction = await prisma.$transaction([
      deletedRelated,
      deletedCategory,
    ]);
    res.send({
      status: 200,
      message: `The category ${transaction[1].name} is deleted!`,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return res.send({
          status: 404,
          message: "The category does not exist.",
        });
    }

    return res.send({
      status: 500,
      message: "Unexpected error!",
    });
  }
}
