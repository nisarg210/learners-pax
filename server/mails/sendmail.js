const path = require("path");
const transport = require("../../server");
const handlebars = require("handlebars");
const pathname = path.join(__dirname, "../emailtemplate/main.html");
const fs = require("fs");

const source = fs.readFileSync(pathname, "utf-8");

module.exports=function sendEmail(filename, teachername) {
  let template = handlebars.compile(source);
  const data = { filename: `${filename}` };
  var result = template(data);
  let mailOptions = {
    from: "Learner's Pax <deathnote.yagami310@gmail.com>",
    to: "projectdev45@gmail.com",
    subject: `Prof. ${teachername} has uploaded a file.👀 😀`,
    text: "it is uploaded",
    html: result,
  };
  // console.log(mailOptions)
  const transporter = transport.transporter;
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error occurs", err);
    } else {
      console.log("Email sent");
    }
  });
}

