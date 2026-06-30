const express = require("express");
const app = express()
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/requests")
const profileRouter = require("./routes/profile")
const userRouter = require("./routes/user")
app.use("/", authRouter);
app.use("/", profileRouter); 
app.use("/", requestRouter);
app.use("/", userRouter);

// Swadhika@2021  
connectDB()
  .then(() => {
    console.log("Database connection established....");
    app.listen(7777, () => {
      console.log("server is successfully listening on port 7777....");
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
