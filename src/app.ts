import Fastify from "fastify";
import { categoryRoutes } from "./routes/category-routes.ts";
import { foodRoutes } from "./routes/food-routes.ts";

const port = 3005;

const app = Fastify({
  logger: true,
});

app.register(foodRoutes);
app.register(categoryRoutes);

app.addHook("preHandler", (req, res, done) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  done();
});

app.get("/", (req, res) => {
  res.send({ status: 200 });
});

app.listen({ port }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
