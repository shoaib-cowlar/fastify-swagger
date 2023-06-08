const { getItems, getSingleItem, saveSingleItem } = require('../controllers/itemsController');

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
        example:{
            id :1,
            name:'this is item'
        }
      },
    },
  },
  handler: getItems,
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
        example:"Item not found"
      },
      500: {
        type: "string",
        description: "Some Server Error",
        example: "Some Server Error",
      },
    },
  },
  handler: getSingleItem,
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
  handler: saveSingleItem,
};

function itemRoutes(fastify, options, done) {
  // Define all your routes here
  fastify.get("/items", getItemsOpts);

  fastify.get("/items/:id", getItemOpts);

  fastify.post("/items", saveItemOpts);

  done();
}

module.exports = itemRoutes;
