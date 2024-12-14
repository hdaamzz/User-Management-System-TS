import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import path = require("path");
import router from './router';

dotenv.config();

const app=express();
const PORT= process.env.PORT || 3003;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../views'));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/',router);



//mongo connection
mongoose.connect('mongodb://localhost:27017/User-Management-System-TS', {
}).then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });