const express = require("express");
const app = express();
const mongoose = require("mongoose");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/mama_sauce';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var foodRouter = require("./routers/foodRouter") ;
var userRouter = require("./routers/userRouter");

app.use("/foods", foodRouter);
app.use("/users", userRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server running or port ", PORT)
})