const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const multerStorageCloudinary =
  require("multer-storage-cloudinary").CloudinaryStorage;

// Set up multer to use cloudinary storage
const storage = new multerStorageCloudinary({
  cloudinary: cloudinary, // using global cloudinary configuration
  params: {
    folder: "events", // folder name on Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // allowed formats for the image
    transformation: [{ width: 500, height: 500, crop: "limit" }], // resize if necessary
  },
});

// Create the multer instance
const upload = multer({ storage });

module.exports = upload;
