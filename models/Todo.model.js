const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  taskname: { type: String },
  status: { type: String },
  tag: { type: String },
  userId: { type: String },
});

const todoModel = mongoose.model('todo', todoSchema);

module.exports = { todoModel };
