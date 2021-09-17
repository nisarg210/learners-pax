const express = require("express");
// const Announcement = require("../../models/announcements");
const NotifyUser = require("../../models/notifiyuser");
const document = require("../../models/document");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const google_upload = require("../../gapi/drive");
const sendmail = require("../../mails/sendmail");
router.post("/upload", upload.single("file"), async function (req, res) {
  try {
    const file = {
      name: req.body.name,
      filepath: req.file.path,
      mimeType: req.file.mimetype,
    };
    console.log(req.body.teachername);
    const response = await google_upload(file);
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
    sendmail(req.body.name, req.body.teachername);
    // const pathname =path.join(__dirname,'../../emailtemplate/main.html')
    // const source = fs.readFileSync(pathname, "utf-8");
    // let template = handlebars.compile(source);
    // const data={"tname": `${req.body.teachername}`}
    // var result = template(data);
    // let mailOptions = {
    //   from: "Learner's Pax <deathnote.yagami310@gmail.com>",
    //   to: "projectdev45@gmail.com",
    //   subject: `Prof. ${req.body.teachername} has uploaded ${req.body.name}.👀 😀`,
    //   text: "it is uploaded",
    //   html:result
    // };
    // // console.log(mailOptions)
    // const transporter = transport.transporter;
    // transporter.sendMail(mailOptions, function (err, data) {
    //   if (err) {
    //     console.log("Error occurs", err);
    //   } else {
    //     console.log("Email sent");
    //   }
    // });
    // console.log(transporter)

    res.json({ msg: "success" });
  } catch (error) {
    console.log(error);
    fs.unlinkSync(req.file.path);
    res.send(error);
  }
});

router.get("/:category/:branch/:semester", async function (req, res) {
  try {
    const { branch, semester, category } = req.params;
    const documentReceived = await document.find({
      branch: branch,
      semester: semester,
      category: category,
    });
    if (documentReceived.length === 0) {
      res.status(404).json({ msg: "Not FOund" });
    }
    const filter = documentReceived.map((document) => ({
      docid: document.docid,
      name: document.name,
      subject: document.subject,
      date: document.date,
    }));
    res.send(filter);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
