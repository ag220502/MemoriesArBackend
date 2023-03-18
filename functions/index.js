// import user post queries
const queries = require("../crudOperations/Posts/userPost");
const profileQueries = require("../crudOperations/Users/Profile/ProfilePage");
const tagQueries = require("../crudOperations/Posts/tagPost");

const { Storage } = require("@google-cloud/storage");
const UUID = require("uuid-v4");
const express = require("express");
const formidable = require("formidable-serverless");

const app = express();
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

var admin = require("firebase-admin");

var serviceAccount = require("../admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const userRef = admin.firestore().collection("users");

const storage = new Storage({
  keyFilename: "admin.json",
});

// "https://firebasestorage.googleapis.com/v0/b/memoriesar-f08a7.appspot.com/o/";
// const bucket = storage.bucket("gs://memoriesar-f08a7.appspot.com");

// we can move this to the router now
const createPost = async (req, res) => {
  console.log("Function")
  const form = new formidable.IncomingForm({ multiples: true });

  try {
    form.parse(req, async (error, fields, files) => {
     
      // check for errors
      if (error) {
        return res.status(400).json(error);
      }
      let imageUrl;
      try {
        imageUrl = await uploadImage(files.postImage,"posts");
      } catch (error) {
        return res.status(400).json(error.message);
      }

      console.log(files, fields)
      // object to send to database
      if (
        !fields.userId ||
        !fields.caption ||
        !fields.lattitude ||
        !fields.longitude
      ) {
        return res.status(404).json("Empty fields");
      } else {
        try {
          console.log(imageUrl)
          const result = await queries.createPost(
            fields.userId,
            fields.caption,
            fields.lattitude,
            fields.longitude,
            fields.flag ? fields.flag : 0
          );
          //   console.log("SQL: Post created.")
          await queries.uploadImage(result.insertId, imageUrl);
          //   console.log("SQL: Image uploaded.")
          if (fields.tag) {
            let tag = fields.tag.slice(1, fields.tag.length - 1).split(",");
            if (tag.length > 0) {
              for (let i = 0; i < tag.length; i++) {
                await tagQueries.tagUser(result.insertId, tag[i]);
                // console.log("SQL: User " + tag[i] + " tagged.")
              }
            }
          }
          return res
            .status(200)
            .json({ message: "Post was created successfully.", url: imageUrl });
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updatePFP = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: true });
  try {
    form.parse(req, async (error, fields, files) => {
      // check for errors
      if (error) {
        return res.status(400).json(error);
      }
      let imageUrl;
      try {
        imageUrl = await uploadImage(files.postImage,"posts");
      } catch (error) {
        return res.status(400).json(error.message);
      }
      // console.log(files, fields)
      // object to send to database
      if (!fields.userId) {
        return res.status(404).json("Empty fields");
      } else {
        try {
          await profileQueries.updatePFP(imageUrl, fields.userId);
          return res
            .status(200)
            .json({ message: "PFP was updated successfully.", url: imageUrl });
        } catch (error) {
          return res.status(400).json(error);
        }
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const uploadImage = async (profileImage, folderName) => {
  try {
    // create a unique id for the image
    let uuid = UUID();

    // url of the uploaded image
    var downLoadPath =
      "https://firebasestorage.googleapis.com/v0/b/memoriesar-f08a7.appspot.com/o/";

    if (!profileImage) {
      throw new Error("No image found");
    }
    // rename the image
    profileImage.name = uuid + profileImage.name;

    // url of the uploaded image
    let imageUrl;

    // get the bucket
    const bucket = storage.bucket("gs://memoriesar-f08a7.appspot.com");

    // check if image is uploaded
    if (profileImage.size == 0) {
      throw new Error("No image found");
    } else {
      // upload image to bucket
      const imageResponse = await bucket.upload(profileImage.path, {
        destination: `${folderName}/${profileImage.name}`,
        resumable: true,
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uuid,
          },
        },
      });

      // get the image url
      imageUrl =
        downLoadPath +
        encodeURIComponent(imageResponse[0].name) +
        "?alt=media&token=" +
        "1";
    }
    return imageUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};

// router.get("/getUsers", async (req, res, next) => {
//   await userRef.get().then((value) => {
//     const data = value.docs.map((doc) => doc.data());
//     res.status(200).send({
//       message: "Fetched all users",
//       data: data,
//     });
//   });
// });

// router.get("/getUser/:id", async (req, res, next) => {
//   await userRef
//     .where("id", "==", req.params.id)
//     .get()
//     .then((value) => {
//       const data = value.docs.map((doc) => doc.data());
//       res.status(200).send({
//         message: "User retrieved ",
//         data: data,
//       });
//     });
// });
module.exports = { createPost, updatePFP, uploadImage };
