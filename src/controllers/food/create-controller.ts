import { FastifyReply, FastifyRequest } from "fastify";
import { FoodToSend } from "../../domain/food";
import prisma from "../../infra/db";

export async function createController(req: FastifyRequest, res: FastifyReply) {
  try {
    const { name, description, categories } = req.body as FoodToSend;
    console.log(categories);
    if (!name)
      return res.send({
        status: 400,
        message: "Name is required!",
      });

    if (!Array.isArray(categories) || !categories?.length)
      return res.send({
        status: 400,
        message: "Categories is required!",
      });

    const newData: any = {
      name,
      description,
      categories: {
        create: categories.map((id) => ({
          category: {
            connect: { id },
          },
        })),
      },
    };

    const data = await prisma.food.create({
      data: { ...newData },
    });
    res.send({
      status: 200,
      data,
    });
  } catch (e) {
    console.log(e);
    return res.send({
      status: 500,
      message: "Unexpected error!",
    });
  }
}
