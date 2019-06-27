const { User } = require("../models");

// create a new user
const createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password
    });
    res.send({ username: user.get("username"), statusCode: res.statusCode });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser
};
