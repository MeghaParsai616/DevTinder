const express = require("express");
const authRouter = express.Router();
const User = require("../models/user")
const { validateSignUpData } = require("../utils/validations");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, resp) => {
  // validation of data

  // encrypt the password

  // creating an new instance of user model

  try {
    validateSignUpData(req);
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
console.log("passwordhas....",passwordHash)
    const user = new User({ ...req.body, password: passwordHash });
    await user.save();
    resp.send("User Added successfully");
  } catch (err) {
    resp.status(400).send("Error:  " + err.message);
  }
});



authRouter.post("/login", async (req, resp) => {
  // validate login info .. if it exixts in DB or not ..
  // if yes

  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    } else {
     // const isPasswordValid = await bcrypt.compare(password, user.password);

     const isPasswordValid =  await user.validatePassword(password);
     console.log("show me password", password)
      if (isPasswordValid) {
        // create the JWT token
        // Add token to cookie and send the response back to the user
        // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790" // {expiresIn: "1hr"}
        // );

        const token = await user.getJWT();
        console.log(token);
        resp.cookie("token", token, {
          expires: new Date(Date.now() + 1 * 360000),
        });

        resp.send("Login Successful !!!!");
      } else {
        throw new Error("Invalid Credentials");
      }
    }
  } catch (err) {
    resp.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", async(req, resp)=>{
     resp.cookie("token", null, {expires : new Date(Date.now())})

      resp.send("user Loggedout successfully")
})


module.exports = authRouter;
