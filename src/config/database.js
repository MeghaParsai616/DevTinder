const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://parsaimegha616:U2Y49HZgZNEoFv2q@nodejscluster.2vhrg.mongodb.net/devTinder",
  );
};

module.exports = connectDB;

