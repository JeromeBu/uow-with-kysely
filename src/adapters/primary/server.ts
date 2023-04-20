import Fastify from "fastify";
import { createUseCases } from "./createUseCases";

const createFastifyApp = () => {
  const fastify = Fastify({ logger: true });

  const useCases = createUseCases();

  // Declare a route
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/books", async (request, reply) => {
    return useCases.getBooks();
  });

  fastify.post("/books", async (request, reply) => {
    return useCases.addBook(request.body as any);
  });

  return fastify;
};

// Run the server!
const start = async () => {
  const fastify = createFastifyApp();
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
