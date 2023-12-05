const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors')
//Global vars
const CONN_STR = "mongodb+srv://rajkumarkvr2023:Samsung753@testdb.ge0dznf.mongodb.net/users?authMechanism=DEFAULT";

const PORT = process.env.PORT | 3000;
const app = express();
//Cors
const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
//Assigning static dir
const STATIC_DIR = path.join(__dirname,'public');
app.use(express.static(STATIC_DIR));

//Routes
const usersRoute = require("./Routes/usersRoutes");

//Assigning apps default callbacks
app.use(express.json());
app.use("/api/users", usersRoute);


// app.get(["/", "/home", "/index"], (req, res) => {
//   res.send("Home page");
// });

//Route for 404
app.use((req, res) => {
  res.send("404 -page not found").status(404);
});

//Db conn and run the  server

(async () => {
  try {
    await mongoose.connect(CONN_STR);
    console.log("Database connected");
    app.listen(process.env.PORT | PORT, () => {
      console.log(`Server is listening at:http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Error occured while connecting database");
  }
})();
