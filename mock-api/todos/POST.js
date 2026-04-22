const { faker } = require('@faker-js/faker');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (req, res) => {
  await sleep(500);
  return res.status(200).json({
    id: faker.string.numeric(10),
    owner: req.body.owner,
    dueDate: req.body.dueDate,
    description: req.body.description,
    completed: req.body.completed,
    tsCreate: faker.date.past().toISOString(),
    tsUpdate: faker.date.recent().toISOString(),
  });
};
