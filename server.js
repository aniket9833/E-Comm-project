const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())


//connection with mongodb
mongoose.connect(db_config.DB_URL)
const db = mongoose.connection

db.on("error",()=>{
    console.log("Error while connecting to the MongoDB");
})

db.once("open",()=>{
    console.log("Connected to the MongoDB");
})


//stitch the route to the server

require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)

//start the server

app.listen(server_config.PORT, ()=>{
    console.log("server started at port no. : ", server_config.PORT);
    init();
})

async function init(){
    try {
        let user = await user_model.findOne({userId : "admin"})

        if(user){
         console.log("Admin is already present");
         return
        }
    } catch (error) {
        console.log("Error while reading the data", error);
    }

    try {
        user = user_model.create({
            name : "Aniket",
            userId : "admin",
            email : "agi@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("pass123", 8)
        })       
        console.log("Admin created", user);

    } catch (error) {
        console.log("Error while creating an admin", error);
    }
}