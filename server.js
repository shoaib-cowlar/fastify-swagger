const fastify = require("fastify")({ logger: true });
const items = require('./items')
const PORT = 5000;


fastify.register(require('./routes/itemsRoutes'))


// fastify.register(require('fastify-swagger'), {
//     exposeRoute: true,
//     routePrefix: '/docs',
//     swagger: {
//       info: { title: 'Careers-API' },
//     },
//   });
  


// // Swagger options
// const swaggerOptions = {
//     routePrefix: "/docs",
//     exposeRoute: true,
//     swagger: {
//       info: {
//         title: "Items API",
//         description: "API documentation for items",
//         version: "1.0.0",
//       },
//       servers: [{ url: "http://localhost:5000" }],
//     },
//   };

//   fastify.register(require("fastify-swagger"), swaggerOptions);

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
