const express = require("express");
const { userAuth } = require("../middlewares/auth");
const  userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest")

userRouter.get("/user/requests/recieved", userAuth, async(req, resp)=>{
    try{
      const loggedInUser = req.user;

      const connectionRequest = await ConnectionRequest.find({
        toUserId : loggedInUser._id,
        status: 'interested'
      }).populate("fromUserId" , ["firstName", "lastName", "photoUrl", "skills", "age", "gender"])

      resp.json({
            message : "Data fetched successfully",
            data: connectionRequest,
      })
    }catch(err){
      resp.status(400).send("Error: "+ err.message)
    }

})

userRouter.get("/user/connections", userAuth, async(req, resp)=>{
    try{
      const loggedInUser = req.user;

      const connectionRequest = await ConnectionRequest.find({
       $or : [ {toUserId : loggedInUser._id, status :"accepted"},
         {fromUserId : loggedInUser._id, status :"accepted"}
       ] 
        
      }).populate("fromUserId" , ["firstName", "lastName", "photoUrl", "skills", "age", "gender"])
      const data = connectionRequest.map((data)=> data.fromUserId)
      resp.json({
            message : "Data fetched successfully",
            data: data,
      })
    }catch(err){
      resp.status(400).send("Error: "+ err.message)
    }

})

userRouter.get("/user/feed", userAuth, async(req, resp)=>{
    try{
      const loggedInUser = req.user;

     // the the all users with ref to connections to and from 
     // if user with status not in arra  [interest , ignores, accepted]
     // user not self ..
     // data of user
    }catch(err){
      resp.status(400).send("Error: "+ err.message)
    }

})
module.exports = userRouter;