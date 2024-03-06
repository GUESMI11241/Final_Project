const express = require("express");
const mongoose = require("mongoose");

//Importation of route
const userRoutes = require('./Routes/userRoute')

//appel au dotenv
require('dotenv').config();

const app = express();
app.use(express.json());


//Routes Middleware
app.use('/apiUsers',userRoutes);

mongoose.connect(process.env.DATABASE,{});
app.listen(process.env.PORT,() => {
console.log(`Server is running...on PORT ${process.env.PORT}`);
});