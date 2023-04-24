import prisma from "../../infra/db.js";
var SearchBy = /*#__PURE__*/function (SearchBy) {
  SearchBy["category"] = "category";
  SearchBy["name"] = "name";
  return SearchBy;
}(SearchBy || {});
export async function findByTextController(req, res) {
  try {
    const {
      search_by,
      search_text
    } = req.query;
    if (!search_by) return res.send({
      status: 400,
      message: 'Search by is required!'
    });
    if (!(search_by in SearchBy)) return res.send({
      status: 400,
      message: 'Search by type is invalid!'
    });
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
    });
    return res.send({
      status: 200,
      data
    });
  } catch (e) {
    return res.send(e);
  }
}