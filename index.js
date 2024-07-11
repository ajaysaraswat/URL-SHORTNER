const express = require("express");
const path = require('path');
const { connectTOMongoDB } = require("./connection");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const URL = require("./models/url");

const staticRouter = require('./routes/staticRouter');
const urlRouter = require("./routes/url");
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');
const { restrictToLoggedinUserOnly ,checkAuth} = require("./middlewares/auth");

const app = express();


const PORT = 8001;

connectTOMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log("mongodb connected")
});


//ejs setup

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());



app.use('/url',restrictToLoggedinUserOnly,urlRouter);
app.use('/user',userRoute);
app.use('/',checkAuth,staticRouter);


app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
 const entry = await URL.findOneAndUpdate(
    {
        shortId,
 },
 {
    $push : {
        visitHistory : {
            timestamp : Date.now(),
        },
    },
 }
);

res.redirect(entry.redirectURL);
});

app.listen(PORT,(req,res)=>{
    console.log(`server started at PORT ${PORT}` );
});