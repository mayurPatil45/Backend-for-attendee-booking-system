// Import your Session model
const Session = require('../models/session'); 

// Route handler to get free sessions

const getFreeSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'free' });

    const formattedSessions = sessions.map(({ wardenId, dayOfWeek, time, slotDetails, status }) => ({
      wardenId,
      dayOfWeek,
      time,
      slotDetails,
      status,
    }));

    res.json(formattedSessions);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const bookSession = async (req, res) => {
  try {
    const { wardenId, dayOfWeek, time, slotDetails } = req.body;

    const session = new Session({
      wardenId,
      dayOfWeek,
      time,
      slotDetails,
      status: 'booked',
    });

    await session.save();

    const updatedSlot = await Session.findOneAndUpdate(
      { wardenId, dayOfWeek, time, status: 'free' },
      { status: 'booked' },
      { new: true }
    );

    res.json({ message: 'Session booked successfully', bookedSession: session, updatedSlot });
  } catch (error) {
    console.error('Error booking session:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getPendingSessions = async (req, res) => {
  try {
    const wardenId = req.user.wardenId; 

    const pendingSessions = await Session.find({ wardenId, status: 'pending' });

    res.json(pendingSessions);
  } catch (error) {
    console.error('Error fetching pending sessions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const hardcodedSessions = [
  { wardenId: 'B', dayOfWeek: 4, time: '10:00', slotDetails: 'Slot A', status: 'free' },
  { wardenId: 'B', dayOfWeek: 5, time: '10:00', slotDetails: 'Slot A', status: 'free' },
];

const addSessions = async (req, res) => {
  try {
    const insertedSessions = await Session.create(hardcodedSessions);

    res.json({ message: 'Sessions added to the database', insertedSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getFreeSessions,
  bookSession,
  getPendingSessions,
  addSessions
};