const moment = require("moment");
const { isValidObjectId } = require("mongoose");

const isValidFormData = (req, res, next) => {
  const age = req.body.age;
  const date = req.body.dob;
  const dateFormat = "YYYY-MM-DD";
  if (isNaN(age) && age !== typeof Number)
    return res.status(400).json({ error: "Invalid Age" });
  if (!moment(date, dateFormat, true).isValid()) {
    return res.status(400).json({ error: "Invalid Date format" });
  }
  next();
};
const isValidId = (req, res, next) => {
  if (isValidObjectId(req.params.id)) {
    next();
  } else return res.status(400).json({ error: "Invalid object ID" });
};

module.exports = { isValidId, isValidFormData };
