import Fastify from "fastify";
import { categoryRoutes } from "./routes/category-routes";
import { foodRoutes } from "./routes/food-routes";

const port = 3005;

const app = Fastify({
  logger: true,
});

app.register(foodRoutes);
app.register(categoryRoutes);

app.addHook("preHandler", (_, res, done) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  done();
});

app.get("/healthz", (_, res) => {
  res.code(200).send({});
});

app.listen({ port }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
