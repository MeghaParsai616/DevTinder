console.log("Beleiver...........🚀");
const express = require("express");
const connectDB = require("./config/database");
// const { adminAuth, userAuth } = require("./middlewares/auth");
const User = require("./models/user")
const app = express();
app.use(express.json())


app.post("/signup", async(req, resp)=>{
  console.log(req.body)
    // creating an new instance of user model 
    const user = new User(req.body);

    try{
         await user.save();
    resp.send("User Added successfully")
    }catch(err){
       resp.status(400).send("error saving the user")
    }
   

})

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
