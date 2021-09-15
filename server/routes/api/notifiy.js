const express = require("express");
const NotifyUser = require("../../models/notifiyuser");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
      const {  name,email,branch, semester } = req.body;
      user = new NotifyUser({
        name,
        email,
        branch,
        semester,
      });
      await user.save();
      res.send(user);
    } catch (error) {
      console.error(error);
    }
  });

  module.exports = router;