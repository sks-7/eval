const { Router } = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { userModel } = require('../models/User.model');

const userController = Router();

userController.post('/signup', (req, res) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send('Something went wrong');
    }

    const user = new userModel({
      email,
      password: hash,
      name,
    });

    try {
      await user.save();

      res.json({ msg: 'signup succesfully' });
    } catch (e) {
      res.send('something went wrong please try after somethime');
    }
  });
});

userController.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  const hash = user.password;

  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send('something went wrong , try agsin');
    }

    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

      res.send({ msg: 'Login success', token });
    } else {
      res.send('Invalid login details please check again ');
    }
  });
});

module.exports = { userController };
