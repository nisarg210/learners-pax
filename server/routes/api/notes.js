const express = require("express");
// const Announcement = require("../../models/announcements");
const document = require("../../models/document");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const google_upload = require("../../gapi/drive");


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
    res.json({msg :"success" });
  } catch (error) {
    // fs.unlinkSync(req.file.path);
    res.send(error);
  }
});

router.get("/:category/:branch/:semester",async function(req,res){
try {
    
} catch (error) {
    console.log(error);
}
})
module.exports = router;
