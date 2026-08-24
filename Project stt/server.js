const { connectDB } = require("./config/db");
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const packageRoutes = require('./routes/packageRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');


connectDB();
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/users',userRoutes);
app.use('/packages',packageRoutes);
app.use('/category',categoryRoutes);
app.use('/bookings',bookingsRoutes);
app.use('/uploads',express.static("uploads"))

app.listen(3010,()=>{
    console.log("Server is connected")
})


