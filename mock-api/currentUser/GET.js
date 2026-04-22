const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (req, res) => {
  await sleep(500);
  return res.status(200).json({
    loginName: 'MMUSTER',
    firstName: 'Max',
    surName: 'Mustermann',
    mail: 'max.mustermann@test.de',
    roles: ['READER', 'EDITOR', 'ADMIN'],
  });
};
