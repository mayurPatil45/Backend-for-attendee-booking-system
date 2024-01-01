const Session = require('../models/session'); // Import your Session model

// Route handler to get free sessions
const getFreeSessions = async (req, res) => {
  try {
    // Retrieve free sessions from the database
    const freeSessions = await Session.find({ status: 'free' });

    // Format sessions to include specific fields
    const formattedSessions = freeSessions.map(session => ({
      wardenId: session.wardenId,
      dayOfWeek: session.dayOfWeek,
      time: session.time,
      slotDetails: session.slotDetails,
      status: session.status,
    }));

    // Respond with the formatted sessions
    res.json(formattedSessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Route handler to book a session
const bookSession = async (req, res) => {
  try {
    const { wardenId, dayOfWeek, time, slotDetails } = req.body;

    // Create and save the session
    const session = new Session({
      wardenId,
      dayOfWeek,
      time,
      slotDetails,
      status: 'booked',
    });

    await session.save();

    // Update the status of the booked slot from free to booked
    const updatedSlot = await Session.findOneAndUpdate(
      { wardenId, dayOfWeek, time, status: 'free' },
      { status: 'booked' },
      { new: true } // To return the updated document
    );

    // Respond with the booked session and the updated slot
    res.json({ message: 'Session booked successfully', bookedSession: session, updatedSlot });
  } catch (error) {
    console.error('Error booking session:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Route handler to get pending sessions for a warden
const getPendingSessions = async (req, res) => {
  try {
    const wardenId = req.user.wardenId; 

    // Find pending sessions for the warden
    const pendingSessions = await Session.find({ wardenId, status: 'pending' });

    // Respond with the pending sessions
    res.json(pendingSessions);
  } catch (error) {
    console.error('Error fetching pending sessions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Hardcoded sessions for testing purposes
const hardcodedSessions = [
  { wardenId: 'B', dayOfWeek: 4, time: '10:00', slotDetails: 'Slot A', status: 'free' },
  { wardenId: 'B', dayOfWeek: 5, time: '10:00', slotDetails: 'Slot A', status: 'free' },
];

// Endpoint: POST /api/add-hardcoded-sessions
// Route handler to add hardcoded sessions to the database
const addSessions = async (req, res) => {
  try {
    // Insert hardcoded sessions into the database
    const insertedSessions = await Session.create(hardcodedSessions);

    // Respond with a success message and the inserted sessions
    res.json({ message: 'Sessions added to the database', insertedSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the route handlers
module.exports = {
  getFreeSessions,
  bookSession,
  getPendingSessions,
  addSessions
};