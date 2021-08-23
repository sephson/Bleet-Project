const express = require("express")
const router = express.Router();
const path = require("path");

const { cloudinary } = require("../utils/cloudinary");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb( null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });
// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)

//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb('Images only!')
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

// router.put("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });


router.put("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "yo-sephson",
    });
    console.log(uploadResponse);
    res.status(200).json({ success: true, uploadResponse });
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = router;
