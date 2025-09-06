const { v4: uuidv4 } = require("uuid");

function createUser({ name, email, password }) {
  return {
    userId: uuidv4(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createUser };
