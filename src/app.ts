import Fastify from "fastify";
import { foodRoutes } from "./routes/food-routes.ts";

const port = 3005

const app = Fastify({
  logger: true
})

app.register(foodRoutes)

app.listen({ port }, (err) => {
  if(err) {
    app.log.error(err)
    process.exit(1)
  }
})