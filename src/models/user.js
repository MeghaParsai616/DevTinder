const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
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
    about: {
      type: String,
      default: "This is default String Val ",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$970");

  return token;
};

UserSchema.methods.validatePassword = async function (originalPassword) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(originalPassword, user.password);

  return isPasswordValid;
};
module.exports = mongoose.model("User", UserSchema);
