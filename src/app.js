console.log("Beleiver...........🚀");
const express = require("express");
const connectDB = require("./config/database");
// const { adminAuth, userAuth } = require("./middlewares/auth");
const User = require("./models/user");
const user = require("./models/user");
const app = express();
app.use(express.json());

app.post("/signup", async (req, resp) => {

    // validation of data 

    // encrypt the password

    
  console.log(req.body);
  // creating an new instance of user model
  const user = new User(req.body);

  try {
    await user.save();
    resp.send("User Added successfully");
  } catch (err) {
    resp.status(400).send("error saving the user....", err.message);
  }
});

// Feed API : GET / feed get all the users from the database

app.get("/feed", async (req, resp) => {
  try {
    const users = await User.find({});
    resp.send(users);
    if (users.length === 0) {
      resp.status(404).send("User Not Found");
    } else {
      resp.send(users);
    }
  } catch (err) {
    resp.status(400).send("something wwend wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {}
});

app.patch("/user/:userId", async (req, resp) => {
  //const userId = req.body.userId;
    const userId = req.params?.userId;
    const data = req.body;

  try {
    const ALLOWED_UPDATES = ["about", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key),
    );

    if (!isUpdateAllowed) throw new Error("Update not allowed")

    await User.findByIdAndUpdate({ _id: userId }, req.body);
    resp.send("user Updated successfully");
  } catch (err) {
    resp.status(400).send("Could not Update :  " +  err?.message);
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
