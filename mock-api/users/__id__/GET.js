const { generateUsers } = require('../../utils/users');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (req, res) => {
  await sleep(500);
  return res.status(200).json({ ...generateUsers(1)[0], id: req.params.id });
};
