const express = require('express');
const router = express.Router();
const { createMember, getAllMembers, getMemberById, getMemberImage } = require('../controllers/membercontroller');
const { handleImageUpload } = require('../middleware/imageUpload');

// POST /api/members - Create a new member (with image upload)
router.post('/members', handleImageUpload, createMember);

// GET /api/members - Get all members
router.get('/members', getAllMembers);

// GET /api/members/:id - Get a specific member by ID
router.get('/members/:id', getMemberById);

// GET /api/members/:id/image - Get member profile image
router.get('/members/:id/image', getMemberImage);

module.exports = router;
