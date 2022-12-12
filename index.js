const express = require('express');
require('dotenv').config();
const { connection } = require('./config/db');
const { userController } = require('./router/user.router');
const { todoController } = require('./router/todo.router');

// const PORT = process.env.PORT;
// console.log(PORT)

const cors = require('cors');
const { authentication } = require('./middleware/Authentication');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('welcome to my server');
});

app.use('/user', userController);

app.use(authentication);

app.use('/todo', todoController);

app.listen(8080, async () => {
  try {
    await connection;
    console.log('connected to database');
  } catch (e) {
    console.log(e);
  }

  console.log(`server is started on 8080`);
});
