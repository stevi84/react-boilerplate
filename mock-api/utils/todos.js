const { faker } = require('@faker-js/faker');

function generateTodos(amount) {
  const todos = [];
  for (let i = 0; i < amount; i++) {
    todos.push({
      id: faker.string.numeric(10),
      owner: faker.person.fullName(),
      dueDate: faker.date.future().toISOString(),
      description: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      tsCreate: faker.date.past().toISOString(),
      tsUpdate: faker.date.recent().toISOString(),
    });
  }
  return todos;
}

module.exports = { generateTodos };
