const express = require("express");
const Announcement = require("../../models/announcements");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, subject, branch, semester, teacher } = req.body;
    anno = new Announcement({
      title,
      description,
      subject,
      branch,
      semester,
      teacher,
    });
    await anno.save();
    res.send(anno);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req, res) => {
  const { branch, semester } = req.body;
  try {
    console.log(branch);
    res.send({
      branch,
      semester,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
