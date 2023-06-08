const {getItems,getSingleItem,saveSingleItem} = require('../controllers/itemsController')
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
  fastify.get("/items", getItemsOpts,getItems );

  fastify.get("/items/:id", getItemOpts,getSingleItem );

  fastify.post("/items",saveItemOpts, saveSingleItem);

  done();
}

module.exports = itemRoutes;
