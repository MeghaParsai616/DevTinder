const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionReuests = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, resp) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      const isStatusValid = allowedStatus.includes(status);

      if (!isStatusValid) {
        return resp.status(400).send(`Invalid status type : "${status}"`);
      }
      const isToUserIdExixts = await User.findById({ _id: toUserId });
      if (!isToUserIdExixts) {
        return resp.status(400).json({
          message: "User Not Found",
        });
      }
      // if fromuserid and touserid already exist in array obj than dont send req
      // take data from connection req iof any ..

      const existingConnectionRequest = await ConnectionReuests.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
       console.log("existingConnectionRequest",existingConnectionRequest)
      if (existingConnectionRequest) {
        return resp.status(400).send(`Connection request already exists`);
      }

      const connectionRequest = new ConnectionReuests({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      resp.json({
        message: `Connection Request status ${status}`,
        data,
      });
    } catch (err) {
      console.error("--- ROUTING ERROR STACK TRACE ---");
    console.error(err.stack);
    console.error("---------------------------------");
      resp.status(400).send("Error: " + err.message);
    }
  },
);

// if i accept ssomeone req  // same person cant send me the connection req
// if i rejected the req
// request id should be valid
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, resp) => {
    try {
      const requestedUserId = req.params.requestId;
      const status = req.params.status;
      const loggedInUserId = req.user._id
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return resp.status(400).json({
          message: "Status is not Allowed",
        });
      }
      // check the request id exixts or not
      const connectionRequst = await ConnectionReuests.findOne({
        _id: requestedUserId,
        toUserId : loggedInUserId,
        status : "interested"
      });
      if (!connectionRequst) {
        return resp.status(400).json({
          message: "Requested User Not Found !!",
        });
      }

      connectionRequst.status = status;
      const data = await connectionRequst.save();
      resp.json({
        message : `Connection Request  ${status}`,
        data : data
      })
    } catch (err) {
      resp.status(400).send("Error: " + err.message);
    }
  },
);

module.exports = requestRouter;
