const express = require("express");
const cors = require("cors");
const bcript = require("bcryptjs");
const bodyParser = require("body-parser");
const User = require('./models/user');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const user = User.findOne({email: 'admin@nextar.com.br'}, async function (err,result){
    if(!result){
        user.name = 'admin';
        user.password = await bcript.hash('admin', 10);
        user.email = 'admin@nextar.com.br';
        user.permission = 'admin';
        User.create(user);
    }
});


require("./controllers/authController")(app);
require("./controllers/userController")(app);

app.listen(8080);
