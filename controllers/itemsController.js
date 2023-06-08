const items = require("../items");
const { v4: uuidv4 } = require("uuid");

const getItems = (req, reply) => {
  reply.send( items );
};

const getSingleItem = (req, reply) => {
  try {
    const id = req.params.id;
    let item = items.find((item) => item.id === id);
    if (item) {
      reply.send( item );
    } else {
      reply.status(400).send("Item Not Found");
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

const saveSingleItem = (req, reply) => {
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
};

module.exports = {
    getItems,getSingleItem,saveSingleItem
}