const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength:14
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  about:{
    type: String,
    default: "This is default String Val "
  },
  skills:{
    type: [String]
  }
},
{
timestamps : true
});

module.exports = mongoose.model("User", UserSchema);
