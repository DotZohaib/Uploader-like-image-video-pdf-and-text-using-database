const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require("path");

// Define storage for uploaded files (images and videos)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4(); // Generate unique filename using uuid
    cb(null, uniqueFilename + path.extname(file.originalname)); // Concatenate filename with timestamp and extension
  },
});

// Define allowed file types (images and videos)
const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Allow file upload
  } else {
    cb(new Error('Only images (.jpeg, .png, .gif) and videos (.mp4, .mov) are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
