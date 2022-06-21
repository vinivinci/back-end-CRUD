const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0.3736q.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
