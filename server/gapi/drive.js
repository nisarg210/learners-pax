const { google } = require("googleapis");
const fs = require("fs");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const KEYPATH = "./learners-pax-955872ff8418.json";

const PARENT = "1ZjMx7Fil-lFgAAZO96sqQMpPe2yTklqF";

const auth = new google.auth.GoogleAuth({
  keyFile: "learners-pax-955872ff8418.json",
  scopes: SCOPES,
});

const driveService = google.drive({ version: "v3", auth: auth });

module.exports = async function upload_to_google(file) {
  try {
    const filestream = fs.createReadStream(file.filepath);
    const reqbody = {
      name: file.name,
      mimeType: file.mimeType,
      parents: [`${PARENT}`],
    };

    const media = {
      mimeType: file.mimeType,
      body: filestream,
    };

    const response = await driveService.files.create({
      requestBody: reqbody,
      media: media,
      fields: "id",
    });

    const permissionResponse = await driveService.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    return response.data.id;
  } catch (error) {
    console.error(error);
  }
};
