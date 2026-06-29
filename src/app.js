console.log("Beleiver...........🚀");
const express = require("express");
const connectDB = require("./config/database");
const { adminAuth, userAuth } = require("./middlewares/auth");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validations");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, resp) => {
  // validation of data

  // encrypt the password

  // creating an new instance of user model

  try {
    validateSignUpData(req);
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ ...req.body, password: passwordHash });
    await user.save();
    resp.send("User Added successfully");
  } catch (err) {
    resp.status(400).send("Error:  " + err.message);
  }
});

app.post("/login", async (req, resp) => {
  // validate login info .. if it exixts in DB or not ..
  // if yes

  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    } else {
     // const isPasswordValid = await bcrypt.compare(password, user.password);

     const isPasswordValid =  user.validatePassword(password);
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

app.get("/profile", userAuth, async (req, resp) => {
  try {
    const user = req.user;

    console.log("req.ueser", req.user);
    resp.send(user);
  } catch (err) {
    resp.status(400).send("Error : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, resp) => {
  try {
    const user = req.user;

    resp.send(`${user.firstName} sent the Connection request`);
  } catch (err) {
    resp.status("Error: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established....");
    app.listen(7777, () => {
      console.log("server is successfully listening on port 3000....");
    });
  })
  .catch((err) => {
    console.log("error with DB connection..", err);
  });

// app.use("/admin", adminAuth);

// app.post("/user/login", (req, resp)=>{
// resp.send("User Logged in Successfully")
// })

// app.get("/user", userAuth, (req, resp) => {
//   resp.send("User Data Sent");
// });

// app.get("/admin/getAllData", (req, resp) => {
//   resp.send("All Data send");
// });

// app.get("/admin/deleteUser", (req, resp) => {
//   resp.send("user has beed deleted");
// });

// Feed API : GET / feed get all the users from the database

// app.get("/feed", async (req, resp) => {
//   try {
//     const users = await User.find({});
//     resp.send(users);
//     if (users.length === 0) {
//       resp.status(404).send("User Not Found");
//     } else {
//       resp.send(users);
//     }
//   } catch (err) {
//     resp.status(400).send("something wwend wrong");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;

//   try {
//     await User.findByIdAndDelete(userId);
//     res.send("User deleted successfully");
//   } catch (err) {}
// });

// app.patch("/user/:userId", async (req, resp) => {
//   //const userId = req.body.userId;
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["about", "gender", "age"];
//     const isUpdateAllowed = Object.keys(data).every((key) =>
//       ALLOWED_UPDATES.includes(key),
//     );

//     if (!isUpdateAllowed) throw new Error("Update not allowed");

//     await User.findByIdAndUpdate({ _id: userId }, req.body);
//     resp.send("user Updated successfully");
//   } catch (err) {
//     resp.status(400).send("Could not Update :  " + err?.message);
//   }
// });
