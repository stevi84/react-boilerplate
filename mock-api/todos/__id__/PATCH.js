const { faker } = require('@faker-js/faker');
const { generateTodos } = require('../../utils/todos');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (req, res) => {
  await sleep(500);
  return res.status(200).json({
    ...generateTodos(1)[0],
    id: req.params.id,
    owner: req.body.owner || generateTodos(1)[0].owner,
    dueDate: req.body.dueDate || generateTodos(1)[0].dueDate,
    description: req.body.description || generateTodos(1)[0].description,
    completed: req.body.completed !== undefined ? req.body.completed : generateTodos(1)[0].completed,
    tsCreate: faker.date.past().toISOString(),
    tsUpdate: new Date().toISOString(),
  });
};
