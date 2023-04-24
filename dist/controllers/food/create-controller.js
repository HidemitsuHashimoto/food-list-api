import prisma from "../../infra/db.js";
export async function createController(req, res) {
  try {
    const {
      name,
      description,
      categories
    } = req.body;
    console.log(categories);
    if (!name) return res.send({
      status: 400,
      message: 'Name is required!'
    });
    if (!Array.isArray(categories) || !categories?.length) return res.send({
      status: 400,
      message: 'Categories is required!'
    });
    const newData = {
      name,
      description,
      categories: {
        create: categories.map(id => ({
          category: {
            connect: {
              id
            }
          }
        }))
      }
    };
    const data = await prisma.food.create({
      data: {
        ...newData
      }
    });
    res.send({
      status: 200,
      data
    });
  } catch (e) {
    console.log(e);
    return res.send({
      status: 500,
      message: 'Unexpected error!'
    });
  }
}