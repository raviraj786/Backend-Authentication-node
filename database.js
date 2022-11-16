const mongoose = require('mongoose');

exports.connectMongoose = () => {
  mongoose.connect('mongodb://0.0.0.0:27017/myoauthDatabase')
    .then((e) => console.log(`Connected to mongoDb:${e.connection.host}`))
    .catch((e) => console.log(e));
}


const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: String
})

exports.User = mongoose.model("User", userSchema);