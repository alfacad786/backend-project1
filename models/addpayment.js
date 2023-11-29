// userpayment add schema====================================

const mongoose = require("mongoose");


const user1Schema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  payment: {
    type: String,
  },
  date: {
    type: String,
    require: true,
  },
 
  });
  const user1 = mongoose.model("user1", user1Schema);
module.exports = user1;
