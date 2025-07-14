const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const formattedFileName = file.originalname
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    return {
      folder: `CyberVault${req.folder ? "/" + req.folder : ""}`,
      allowed_formats: ["jpeg", "png", "jpg"],
      public_id: `${Date.now()}-${formattedFileName}`,
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
