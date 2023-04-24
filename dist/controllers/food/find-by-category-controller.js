import prisma from "../../infra/db.js";
export async function findByCategoryController(req, res) {
  try {
    const {
      categoryId
    } = req.params;
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
    });
    return res.send({
      status: 200,
      data
    });
  } catch (e) {
    return res.send(e);
  }
}