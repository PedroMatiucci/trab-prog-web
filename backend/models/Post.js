const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const postSchema = new Schema({
  titulo: String,
  texto: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
module.exports = mongoose.model("Post", postSchema);