const express = require("express");
// const Announcement = require("../../models/announcements");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const google_upload = require("../../gapi/drive");
router.post("/upload", upload.single("file"), async function (req, res) {
  try {
    // branch:req.body.branch,
    // semester:req.body.semester,
    const file = {
      name: req.body.name,
      filepath: req.file.path,
      mimeType: req.file.mimetype,
    };
    const response = await google_upload(file);
    console.log("req.file.path");
    fs.unlink(req.file.path, (error) => {
      console.log(error);
    });
    res.json({ id: response });
  } catch (error) {
    // fs.unlinkSync(req.file.path);
    res.send(error);
  }
});
module.exports = router;
