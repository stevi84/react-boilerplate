const path = require('node:path');
const express = require('express');
const cors = require('cors');
const apiMocker = require('connect-api-mocker');

const PORT = 5000;

const app = express();
app.use(cors());
app.use('/todos', apiMocker(path.join(__dirname, 'todos')));
app.use('/users', apiMocker(path.join(__dirname, 'users')));
app.use('/currentUser', apiMocker(path.join(__dirname, 'currentUser')));
app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
