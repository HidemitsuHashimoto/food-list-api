import prisma from "../../infra/db.js";
export async function createController(req, res) {
  try {
    const {
      name
    } = req.body;
    if (!name) return res.send({
      status: 400,
      message: 'Name is required!'
    });
    const data = await prisma.category.create({
      data: {
        name
      }
    });
    res.send({
      status: 200,
      data
    });
  } catch (e) {
    return res.send({
      status: 500,
      message: 'Unexpected error!'
    });
  }
}