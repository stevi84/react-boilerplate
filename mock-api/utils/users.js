const { faker } = require('@faker-js/faker');

function generateUsers(amount) {
  const users = [];
  for (let i = 0; i < amount; i++) {
    users.push({
      id: faker.string.numeric(10),
      name: faker.person.fullName(),
      dateOfBirth: faker.date.past({ years: 80 }).toISOString(),
      size: faker.number.int({ min: 150, max: 200 }),
      weight: faker.number.float({ min: 50, max: 100, fractionDigits: 1 }),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      tsCreate: faker.date.past().toISOString(),
      tsUpdate: faker.date.recent().toISOString(),
    });
  }
  return users;
}

module.exports = { generateUsers };
