const express = require("express");
// const Announcement = require("../../models/announcements");
const NotifyUser = require("../../models/notifiyuser");
const document = require("../../models/document");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const { upload_to_google, delete_from_drive } = require("../../gapi/drive");
const sendmail = require("../../mails/sendmail");
router.post("/upload", upload.single("file"), async function (req, res) {
  try {
    const file = {
      name: req.body.name,
      filepath: req.file.path,
      mimeType: req.file.mimetype,
    };
    console.log(req.body.teachername);
    const response = await upload_to_google(file);
    console.log("req.file.path");
    fs.unlink(req.file.path, (error) => {
      console.log(error);
    });

    const documentDetail = new document({
      name: req.body.name,
      teacher: req.body.teachername,
      branch: req.body.branch,
      semester: req.body.semester,
      subject: req.body.subject,
      docid: response,
      category: req.body.category,
    });
    await documentDetail.save();
    const studentlist = await NotifyUser.find({
      branch: req.body.branch,
      semester: req.body.semester,
    });
    const emails = studentlist.map((student) => student.email);
    const emailstring = emails.join([(separator = ", ")]);
    //  ------------------EMAIL PART-----------------
    sendmail(req.body.name, req.body.teachername, emailstring);
    res.json({ msg: "success" });
    res.status(500).json({ msg: "my error" });
  } catch (error) {
    console.log(error);
    fs.unlinkSync(req.file.path);
    res.send(error);
  }
});

router.get("/:category/:branch/:semester", async function (req, res) {
  try {
    const { branch, semester, category } = req.params;
    const documentReceived = await document
      .find({
        branch: branch,
        semester: semester,
        category: category,
      })
      .sort({ date: -1 });
    if (documentReceived.length === 0) {
      return res.status(404).json({ msg: "Not FOund" });
    }
    const filter = documentReceived.map((document) => ({
      docid: document.docid,
      name: document.name,
      subject: document.subject,
      date: document.date,
      teacher: document.teacher,
    }));

    res.send(filter);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const deletedResponse = delete_from_drive(id);
    const deletedDoc = await document.deleteOne({ docid: id });
    res.json({ msg: "Deleted" });
    res.statusCode = 200;
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
