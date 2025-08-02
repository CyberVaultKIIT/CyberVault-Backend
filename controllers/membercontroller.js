const Member = require('../models/Members');
const { sendResponse } = require('../utils/responseHandler');
const Logger = require('../utils/Logger');

exports.createMember = async (req, res) => {
  try {
    // Log the incoming request data (without sensitive info)
    Logger.log('Creating new member with data:', {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      hasProfileImage: !!req.file
    });
    
    // Validate required fields
    const { name, email, role, github, linkedin, twitter } = req.body;
    if (!name || !email || !role || !github || !linkedin || !twitter) {
      Logger.log('Validation failed: Missing required fields');
      return sendResponse(res, 400, 'Name, email, role, GitHub URL, LinkedIn URL, and Twitter URL are all required fields');
    }

    // Check if member with this email already exists
    const existingMember = await Member.findOne({ email: email.toLowerCase().trim() });
    if (existingMember) {
      Logger.log('Member creation failed: Email already exists', email);
      return sendResponse(res, 409, 'A member with this email already exists');
    }

    // Prepare member data
    const memberData = { ...req.body };
    
    // Handle image upload if present
    if (req.file) {
      memberData.profileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname,
        size: req.file.size,
        uploadDate: new Date()
      };
      Logger.log('Image uploaded:', {
        filename: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
      });
    }

    const newMember = new Member(memberData);
    await newMember.save();
    
    // Return member data without the image buffer for response
    const memberResponse = newMember.toObject();
    if (memberResponse.profileImage && memberResponse.profileImage.data) {
      memberResponse.profileImage = {
        ...memberResponse.profileImage,
        data: `<Buffer ${memberResponse.profileImage.data.length} bytes>`,
        hasImage: true
      };
      delete memberResponse.profileImage.data;
    }
    
    Logger.log('Member created successfully:', newMember._id);
    return sendResponse(res, 201, 'Member added successfully', memberResponse);
  } catch (error) {
    Logger.error('Error adding member:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      Logger.log('Validation errors:', errorMessages);
      return sendResponse(res, 400, 'Validation failed', { errors: errorMessages });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      Logger.log('Duplicate key error for email');
      return sendResponse(res, 409, 'A member with this email already exists');
    }
    
    return sendResponse(res, 500, 'Internal Server Error', { error: error.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().select('-__v').sort({ createdAt: -1 });
    
    // Transform members to exclude image data in list view
    const membersResponse = members.map(member => {
      const memberObj = member.toObject();
      if (memberObj.profileImage && memberObj.profileImage.data) {
        memberObj.profileImage = {
          ...memberObj.profileImage,
          hasImage: true,
          imageUrl: `/api/members/${memberObj._id}/image`
        };
        delete memberObj.profileImage.data;
      }
      return memberObj;
    });
    
    return sendResponse(res, 200, 'Members retrieved successfully', membersResponse);
  } catch (error) {
    Logger.error('Error retrieving members:', error);
    return sendResponse(res, 500, 'Internal Server Error', { error: error.message });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id).select('-__v');
    
    if (!member) {
      return sendResponse(res, 404, 'Member not found');
    }
    
    // Transform member data to exclude image buffer
    const memberResponse = member.toObject();
    if (memberResponse.profileImage && memberResponse.profileImage.data) {
      memberResponse.profileImage = {
        ...memberResponse.profileImage,
        hasImage: true,
        imageUrl: `/api/members/${memberResponse._id}/image`
      };
      delete memberResponse.profileImage.data;
    }
    
    return sendResponse(res, 200, 'Member retrieved successfully', memberResponse);
  } catch (error) {
    Logger.error('Error retrieving member:', error);
    return sendResponse(res, 500, 'Internal Server Error', { error: error.message });
  }
};

exports.getMemberImage = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id).select('profileImage');
    
    if (!member || !member.profileImage || !member.profileImage.data) {
      return res.status(404).json({
        status: 404,
        message: 'Image not found'
      });
    }
    
    res.set({
      'Content-Type': member.profileImage.contentType,
      'Content-Length': member.profileImage.size,
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    });
    
    res.send(member.profileImage.data);
  } catch (error) {
    Logger.error('Error retrieving member image:', error);
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error'
    });
  }
};
