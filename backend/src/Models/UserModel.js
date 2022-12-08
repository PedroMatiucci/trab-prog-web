const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  username: String,
  password: String,
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;