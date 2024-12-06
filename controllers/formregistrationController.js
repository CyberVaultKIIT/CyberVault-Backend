const { v4: uuidv4 } = require('uuid'); 
const moment = require('moment'); 

// Mock database
let formRegistrations = [];

// Function to generate Team_id based on event name
function generateTeamId(eventName, count) {
    const prefix = eventName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    return `${prefix}${String(count).padStart(2, '0')}`; // e.g., 'EV01', 'EV02'
}

// Controller to save and validate response
function saveFormRegistration(req, res) {
    try {
        const { UserId, Team_id, Response } = req.body;
        if (!UserId || !Response) {
            return res.status(400).json({ error: 'UserId and Response are required.' });
        }
        const count = formRegistrations.length + 1;
        const eventName = 'Event Name'; 
        const newTeamId = Team_id || generateTeamId(eventName, count);
        const newRegistration = {
            ID: uuidv4(),
            UserId,
            Team_id: newTeamId,
            CreatedAt: moment().toISOString(),
            UpdatedAt: moment().toISOString(),
            Response
        };
        formRegistrations.push(newRegistration);

        return res.status(201).json({
            message: 'Form registration saved successfully.',
            data: newRegistration
        });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while saving the form.' });
    }
}

