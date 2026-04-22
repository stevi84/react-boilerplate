const { faker } = require('@faker-js/faker');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (req, res) => {
  await sleep(500);
  return res.status(200).json({
    id: faker.string.numeric(10),
    name: req.body.name,
    dateOfBirth: req.body.dateOfBirth,
    size: req.body.size,
    weight: req.body.weight,
    email: req.body.email,
    phone: req.body.phone,
    tsCreate: faker.date.past().toISOString(),
    tsUpdate: faker.date.recent().toISOString(),
  });
};
