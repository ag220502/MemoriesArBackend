const admin = require("firebase-admin");

// Initialize the Firebase Admin SDK
const serviceAccount = require("../admin.json");

const UUID = require("uuid-v4");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://memoriesar-f08a7.appspot.com",
});

const bucket = admin.storage().bucket();


const uploadImage = (base64EncodedImageString, uuid) => {
  
  const file = bucket.file(`${uuid}.jpg`);
  // Convert the base64-encoded image string to a Buffer
  const imageBuffer = Buffer.from(base64EncodedImageString, "base64");

  // Create a write stream to Firebase Storage
  const stream = file.createWriteStream({
    metadata: {
      contentType: "image/jpeg",
    },
  });

  stream.on("error", (err) => {
    console.error(err);
  });

  stream.on("finish", () => {
    console.log("Image uploaded successfully");
  });

  // Write the image buffer to Firebase Storage
  stream.end(imageBuffer);

  const config = {
    action: "read",
    expires: "03-01-2500",
  };

  file.getSignedUrl(config, (err, url) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Image download URL:", url);
  });
};

module.exports = { uploadImage };