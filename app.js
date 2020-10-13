const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/mama_sauce';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var dishRouter = require("./routers/dishRouter") 


app.use("/", dishRouter)

var PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server running or port ", PORT)
})


