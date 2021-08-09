const express = require("express");

const router = express.Router();

const { check, validationResult } = require("express-validator");

const Teacher = require("../../models/teachers");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//@route  Post api/user
//@desc   Test route
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("emailID", "Pleade enter valid Email").isEmail(),
    check("password", "Please enter password more than 6 letters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { name, emailID, password, branch } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
    }
    try {
      let teacher = await Teacher.findOne({ emailID: emailID });
      if (teacher) {
        res.status(400).json({ error: [{ msg: "User already exist" }] });
      }

      teacher = new Teacher({
        name,
        emailID,
        password,
        branch,
      });
      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(password, salt);
      console.log(teacher);
      await teacher.save();
      res.json({ msg: "Saved" });
      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };
      // jwt.sign(
      //   payload,
      //   config.get("jwtToken"),
      //   { expiresIn: 3600000 },
      //   (err, token) => {
      //     if (err) {
      //       throw err;
      //     }
      //     res.json({ token });
      //   }
      // );
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

router.post(
  "/login",
  [
    check("emailID", "Pleade enter valid Email").isEmail(),
    check("password", "Please enter password more than 6 letters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { emailID, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
    }
    try {
      let teacher = await Teacher.findOne({ emailID });
      if (!teacher) {
        res.status(400).json({ error: [{ msg: "User not exist" }] });
      }

      const isMatch = await bcrypt.compare(password, teacher.password);

      if (!isMatch) {
        res.status(400).json({ error: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        teacher: {
          id: teacher.id,
          name: teacher.name,
          branch: teacher.branch,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token, teacher });
        }
      );
    } catch (err) {
      console.log(err.msg);
    }
  }
);
module.exports = router;
