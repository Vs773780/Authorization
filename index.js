const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT ||4000;

// coolies parser
app.json(express.json());
require("./config/database").connect();
 // routes import and mount
 const user = require("./routes/user");
 app.use("/api/v1" , user);

 //activation
 app.listen(PORT , () => {
    console.log('App is listening at ${PORT}');
 })