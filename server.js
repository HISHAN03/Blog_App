const express = require('express');
const app = express();
const articleroute=require('./routes/articleroute')
require('dotenv').config();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ limit: "10mb", extended: false }));
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("connected ")})
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set('view engine','ejs')
app.set('views','article')
app.use('/', articleroute)

app.listen(3000,()=>{
    console.log('app sucessufully running')
})  