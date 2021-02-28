const Router = require("express");
const User = require("../models/user");
const authMiddleware = require("../middlewares/auth");
const permissionMiddleware = require("../middlewares/verifyPermission");
const router = Router();

router.use(authMiddleware);

router.post("/register", permissionMiddleware, async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Usuário ja existente" });
    const user = await User.create(req.body);
    user.password = undefined;
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send({ error: "Erro ao criar usuário" });
  }
});
router.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send( users );
  } catch (err) {
    return res.status(400).send("Erro ao buscar usuários");
  }
});
router.get("/getForname", async (req, res)=>{
  try {
    const name = req.query.name;
    if(name){
      const users = await User.find({name: { $regex: new RegExp("^" + name.toLowerCase(), "i") } });
      return res.status(200).send( users );
    }else{
      const users = await User.find();
      return res.status(200).send( users );
    }  
  } catch (err) {
    return res.status(400).send("Erro ao buscar usuários");
  }
})
router.put("/update/:userId", permissionMiddleware, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select("+password");
    if (!user) {
      res.status(400).send({ error: "Usuário não existe" });
    }

    const { name, email, password, phone, permission } = req.body;
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.password = password ?? user.password;
    user.permission = permission ?? user.permission;
    user.save();
    return res.status(200).send(true);
  } catch (err) {
    return res.status(400).send({ error: "Erro ao modificar usuário" });
  }
});
router.delete("/delete/:userId", permissionMiddleware, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select("+password");
    if (!user) {
      res.status(400).send({ error: "Usuário não existe" });
    }
    user.delete();
    return res.status(200).send(true);
  } catch (error) {
    return res.status(400).send({ error: "Erro ao deletar usuário" });
  }
});
module.exports = (app) => app.use("/app", router);
