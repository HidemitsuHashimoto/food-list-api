import prisma from "../../infra/db.js";
export async function findManyController(req, res) {
  try {
    const data = await prisma.category.findMany();
    return res.send({
      status: 200,
      data
    });
  } catch (e) {
    return res.send(e);
  }
}