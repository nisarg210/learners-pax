const express = require("express");
// const Announcement = require("../../models/announcements");
const router = express.Router();
const multer =require("multer");
const upload = multer({ dest: 'uploads/' })

const google_upload = require("../../gapi/drive")
router.post('/upload', upload.single('file'), async function (req, res) {
    try {
        // branch:req.body.branch,
        // semester:req.body.semester,
        const file={
            name:req.body.name,
            filepath:req.file.path,
            mimeType:req.file.mimetype
        }
        const response = await google_upload(file);
        
        res.send(response);
    } catch (error) {
        res.send(400)
    }
    
  })
  module.exports = router;