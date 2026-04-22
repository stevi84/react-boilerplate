const { generateTodos } = require('../utils/todos');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (req, res) => {
  await sleep(500);
  return res.status(200).json(generateTodos(2));
};
