const User = require("../models/user");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(401).send({ error: "Usuario sem permissão" });
  }

  if (user.permission !== "admin") {
    return res.status(401).send({ error: "Usuario sem permissão" });
  }

  return next();
};
