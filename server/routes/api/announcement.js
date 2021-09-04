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

router.get("/:branch/:semester", async (req, res) => {
  const { branch, semester } = req.params;
  try {
    console.log(branch);
    const announcements = await Announcement.find({
      branch: branch,
      semester: semester,
    });
    if (announcements.length===0) {
      res.status(400).json({ error: [{ msg: "NOt FOund" }] });
    }
    const filter =announcements.map((anno)=>({
      name:anno.teacher,
      subject:anno.subject,
      title:anno.title,
      date:anno.date,
      description:anno.description
    }))
    res.send(
     filter
    );
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
