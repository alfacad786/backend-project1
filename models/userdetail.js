// userdetail schema====================================

const mongoose = require("mongoose");

const userdetailSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  passWord: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  city: {
    type: String,
  },
  area: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    maxlength: 10,
    minlength: 10,
    require: true,
  },
  email: {
    type: String,
  },
});

//     ===========================
// mongodb me detabase  me collections create karne ke liya ===========
const userdetail = mongoose.model("userdetail", userdetailSchema);
module.exports = userdetail;
//    ===================================

