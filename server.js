const fastify = require("fastify")({ logger: true });
const PORT = 5000;


fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'Items-API' },
    },
  });

  
fastify.register(require('./routes/itemsRoutes'))



const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
