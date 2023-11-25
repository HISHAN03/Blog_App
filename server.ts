import express from 'express';
import bodyparser  from "body-parser";
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import articleroute from './routes/articleroute';
const app = express();
require('dotenv').config();


// if(!process.env.MONGO_URL)
// {
//     console.error('MongoDB connection string is not defined in the environment variables.');
//     process.exit(1);
// }
mongoose.connect("mongodb+srv://hishan:1234@cluster0.sksy2nt.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("connected ")})

app.use(bodyparser.urlencoded({ limit: "10mb", extended: false }));
app.use(methodOverride('_method'))
app.use('/', articleroute)
app.set('view engine','ejs')
app.set('views','article')

app.listen(3000,()=>{
    console.log('app sucessufully running')
})  