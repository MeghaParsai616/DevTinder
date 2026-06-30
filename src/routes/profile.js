const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validations");
const bcrypt = require("bcrypt")

profileRouter.get("/profile/view", userAuth, async (req, resp) => {
  try {
    const user = req.user;

    console.log("req.ueser", req.user);
    resp.send(user);
  } catch (err) {
    resp.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, resp) => {
  try {
    if (!validateEditProfileData(req)) {
      return resp.status(400).send("edit not allowed");
    }
    const loggedInUser = req.user;
    // if user exists the update findbyid and update
    // cant edit password and email

    //  Object.keys(req.body).forEach((key)=>loggedInUser[key] = req.body[key])
    // await loggedInUser.save()

    const updatedUser = await User.findByIdAndUpdate(
      { _id: loggedInUser._id },
      req.body,
      { runValidators: true, new: true },
    );

    // resp.send("profile updated successfully !!");

    resp.json({
      message: `${updatedUser.firstName} your profile updated successfully`,
      data: updatedUser,
    });
  } catch (err) {
    resp.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, resp) => {
  try {
    if (req.body.password) {
      const loggedInUser = req.user;
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      const updatedUser = await User.findByIdAndUpdate(
        { _id: loggedInUser._id },
        { password: passwordHash },
        { runValidators: true, new: true },
      );
    } else {
      throw new Error("incorrect password");
    }

    // if user exists the update findbyid and update
    // cant edit password and email

    //  Object.keys(req.body).forEach((key)=>loggedInUser[key] = req.body[key])
    // await loggedInUser.save()

    resp.send("Password updated successfully !!");
  } catch (err) {
    resp.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
