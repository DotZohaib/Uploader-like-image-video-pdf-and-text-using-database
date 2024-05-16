const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/facebook');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  image: String,
  files: [String],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // Reference to Post model
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
