const jwt = require("jsonwebtoken");
const User = require("../models/user")

const adminAuth = (req, resp, next) => {
  const token = "xyz"; //req.body?.token
  const isAdminAutherized = token === "xyz";

  if (!isAdminAutherized) {
    resp.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};

const userAuth = async (req, resp, next) => {
    const {token} = req.cookies;
  try {
    if (token) {
         const decodedMessage = await jwt.verify(token, "DEV@Tinder$970"); // give a decoded value
         console.log("decodedMessage..", decodedMessage);
   
         const user = await User.findById({ _id: decodedMessage._id });
         if(!user){
           throw new Error("User does not exists")
         }
        req.user = user
         next();
       } else {
         throw new Error("User Not Authorised")
       }
  } catch (err) {
    resp.status(400).send("Error:  " + err.message);
  }
};


module.exports = {
  adminAuth,
  userAuth,
};

// const userAuth = (req, resp, next) => {
//   const token = "xyz"; //req.body?.token
//   const isAdminAutherized = token === "xyz";

//   if (!isAdminAutherized) {
//     resp.status(401).send("Unauthorized Request");
//   } else {
//     next();
//   }
// };
