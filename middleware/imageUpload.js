const multer = require('multer');
const path = require('path');

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Middleware for single image upload
const uploadSingle = upload.single('profileImage');

// Wrapper to handle multer errors
const handleImageUpload = (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          status: 400,
          message: 'File too large. Maximum size is 5MB.',
        });
      }
      return res.status(400).json({
        status: 400,
        message: `Upload error: ${err.message}`,
      });
    } else if (err) {
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
    next();
  });
};

module.exports = { handleImageUpload };
