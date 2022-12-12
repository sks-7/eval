const { Router } = require('express');
require('dotenv').config();

const { todoModel } = require('../models/Todo.model');

const todoController = Router();

todoController.get('/', async (req, res) => {
  const query = req.query;

  const todo = await todoModel.find(query);

  res.send(todo);
});

todoController.get('/:id', async (req, res) => {
  const { id } = req.params;

  const todo = await todoModel.findOne({ id: id });

  res.send(todo);
});

todoController.post('/create', async (req, res) => {
  const { taskname, status, tag, userId } = req.body;

  const todo = new todoModel({
    taskname,
    status,
    tag,
    userId,
  });
  try {
    await todo.save();

    res.send('Blog is created');
  } catch (e) {
    res.send('something went wrong');
  }
});

todoController.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const deleteTodo = await todoModel.findOneAndDelete({
    _id: id,
    userId: req.body.userId,
  });

  if (deleteTodo) {
    res.send('todo delete ');
  } else {
    res.send('can not deleted');
  }
});

todoController.patch('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const editTodo = await todoModel.findOneAndUpdate(
    {
      _id: id,
      userId: req.body.userId,
    },
    req.body
  );

  if (editTodo) {
    res.send('todo updated ');
  } else {
    res.send('can not updated');
  }
});

module.exports = { todoController };
