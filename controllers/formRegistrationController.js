const { v4: uuidv4 } = require('uuid'); 
const moment = require('moment'); 



function generateTeamId(eventName, count) 
{
    const prefix = eventName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    return `${prefix}${String(count).padStart(2, '0')}`; 
}


function saveFormRegistration(req, res) {
    try 
    {
        const { userId, team_id, response, eventName } = req.body;
        if (!userId || !response || !eventName) 
        {
            return res.status(400).json({ error: 'UserId, Response, and EventName are required.' });
        }
        const count = formRegistrations.length + 1;
        const newTeamId = team_id || generateTeamId(eventName, count);
        const newRegistration = {
            id: uuidv4(),
            userId,
            team_id: newTeamId,
            createdAt: moment().toISOString(),
            updatedAt: moment().toISOString(),
            response
        };
        formRegistrations.push(newRegistration);
        return res.status(201).json({
            message: 'Form registration saved successfully.',
            data: newRegistration
        });
    } 
    catch (error) 
    {
        console.error('Error saving form registration:', error.message);
        return res.status(500).json({ error: 'An error occurred while saving the form.' });
    }
}

