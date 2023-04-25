require('../config/config');

const User = require('../models/user');
const verifyToken = require('../middleware/auth');
const routes = require('express').Router();

routes.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
      return res.status(400).send({ message: "All input is required" });
    }
    // check if user already exist
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({ message: "User Already Exist. Please Login" });
    }
    const user = new User({ name, email, password });
    await user.save();
    const token = await user.generateAuthToken();
    user.token = token
    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

routes.get("/", verifyToken, (req, res) => {
  res.send(req.user);
})

routes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({ message: "All input is required" });
    }
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    user.token = token;
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send({ message: "Invalid Credentials" });
  }
});
module.exports = routes;