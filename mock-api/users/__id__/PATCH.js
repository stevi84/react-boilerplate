const { faker } = require('@faker-js/faker');
const { generateUsers } = require('../../utils/users');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (req, res) => {
  await sleep(500);
  return res.status(200).json({
    ...generateUsers(1)[0],
    id: req.params.id,
    name: req.body.name || generateUsers(1)[0].name,
    dateOfBirth: req.body.dateOfBirth || generateUsers(1)[0].dateOfBirth,
    size: req.body.size || generateUsers(1)[0].size,
    weight: req.body.weight || generateUsers(1)[0].weight,
    email: req.body.email || generateUsers(1)[0].email,
    phone: req.body.phone || generateUsers(1)[0].phone,
    tsCreate: faker.date.past().toISOString(),
    tsUpdate: new Date().toISOString(),
  });
};
