import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { FoodToSend } from "../../domain/food";
import prisma from "../../infra/db";

export async function updateController(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const { name, description, categories } = req.body as FoodToSend;

    if (!id)
      return res.send({
        status: 400,
        message: "ID is required!",
      });

    if (!name && !description)
      return res.send({
        status: 400,
        message: "Name or Description is required!",
      });

    const newData: any = {};

    if (name) newData["name"] = name;

    if (description) newData["description"] = description;

    if (Array.isArray(categories) && categories.length)
      newData["categories"] = {
        create: categories.map((id) => ({
          category: {
            connect: { id },
          },
        })),
      };

    const relatedData = prisma.categoriesOnFoods.deleteMany({
      where: {
        foodId: id,
      },
    });
    const updatedData = prisma.food.update({
      where: { id },
      data: { ...newData },
    });

    const transaction = await prisma.$transaction([relatedData, updatedData]);
    res.send({
      status: 200,
      message: `The food ${transaction[1].name} is updated!`,
    });
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025")
        return res.send({
          status: 404,
          message: "The food does not exist.",
        });
    }

    return res.send({
      status: 500,
      message: "Unexpected error!",
    });
  }
}
