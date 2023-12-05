const express = require("express");
const router = express.Router();
const User = require("../Model/userModel");

const { isValidId, isValidFormData } = require("../Middlewares/userMiddleware");
//Get all records
router.get("/", (req, res) => {
  User.find()
    .then((data) => {
      data
        ? res.send(data)
        : res.status(400).json({ Error: "No records found" });
    })
    .catch((err) => console.log(err));
});

//Create a new record
router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  User.create(data)
    .then((data) => {
      res.status(201).json({status:true});
    
    })
    .catch((err) => {
      res.status(400).json({status:false});
    });
});

//Read a record
router.get("/:id", isValidId, (req, res) => {
  const userID = req.params.id;
  User.findById(userID)
    .then((data) => {
      data
        ? res.send(data)
        : res.status(400).json({ Error: "No records found" });
    })
    .catch((err) => console.log(err));
});

//Update a record
router.put("/:id", isValidId, (req, res) => {
  const userID = req.params.id;
  const data = req.body;
  User.findByIdAndUpdate(userID, data, { new: true })
    .then((data) => {
      data
        ? res.send(data)
        : res.status(400).json({ Error: "No records found" });
    })
    .catch((err) => console.log(err));
});

//Delete a record
router.delete("/:id", isValidId, (req, res) => {
  const userID = req.params.id;
  User.findByIdAndDelete(userID)
    .then(() => {
      res.send("Deleted");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
