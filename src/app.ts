import Fastify from "fastify";
import { foodRoutes } from "./routes/food-routes.ts";
import { categoryRoutes } from "./routes/category-routes.ts";

const port = 3005

const app = Fastify({
  logger: true
})

app.register(foodRoutes)
app.register(categoryRoutes)

app.listen({ port }, (err) => {
  if(err) {
    app.log.error(err)
    process.exit(1)
  }
})