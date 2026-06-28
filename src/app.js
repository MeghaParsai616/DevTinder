console.log("Beleiver...........🚀")
const express = require("express");

const app = express();

app.use("/test",(req, res)=>{
   res.send("hello from the check for test test....")
})


app.use("/hello",(req, res)=>{
   res.send("hello hello  hello server")
})

app.listen(3000, ()=>{
    console.log("server is successfully listening on port 3000....")
})