const Router = require("express");
const User = require("../models/user");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const router = Router();

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).send("Email ou senha invalidos" );
    }
    if (!(await bcript.compare(password, user.password))) {
      return res.status(401).send("Email ou senha invalidos" );
    }
    user.password = undefined;
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    });
    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(500).send({ error: "Erro indefinido" });
  }
});
module.exports = (app) => app.use("/auth", router);
