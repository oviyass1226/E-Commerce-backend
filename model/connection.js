const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/UserData")
.then(()=>{
    console.log("Connected successfully")
})
.catch((error)=>{
    console.log("Connection failed",error.message)
})