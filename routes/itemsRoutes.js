const items = require("../items");
const { v4: uuidv4 } = require("uuid");

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
};

const getItemOpts = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
    response: {
      200: {
        schema: {
          type: "object",
          properties: {
            items: Item,
          },
        },
      },
      400: {
        type: "string",
        description: "Item Not Found",
      },
      500: {
        type: "string",
        description: "Some Server Error",
      },
    },
  },
};

const saveItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          item: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
            },
          },
        },
      },
    },
  },
};

function itemRoutes(fastify, options, done) {
  // Define all your routes here
  fastify.get("/items", getItemsOpts, (req, reply) => {
    reply.send({ items });
  });

  fastify.get("/items/:id", getItemOpts, (req, reply) => {
    try {
      const id = req.params.id;
      let item = items.find((item) => item.id === id);
      if (item) {
        reply.send({ item });
      } else {
        reply.status(400).send("Item Not Found");
      }
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  fastify.post("/items",saveItemOpts, (req, reply) => {
    try {
      const { name } = req.body;
      // Generate a unique ID using UUIDv4
      const id = uuidv4();
      const newItem = {
        id,
        name,
      };

      items.push(newItem);
      reply.status(201).send({ item: newItem });
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  done();
}

module.exports = itemRoutes;
