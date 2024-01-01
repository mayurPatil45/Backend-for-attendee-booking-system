const jwt = require('jsonwebtoken');
const Warden = require('../Models/warden');
require('dotenv').config()

// Function to generate a JWT token for a given wardenId
const generateToken = (wardenId) => {
    return jwt.sign(
        { wardenId },  // Payload: Include wardenId in the token
        process.env.SECRETKEY,  // Secret key to sign the token
        { expiresIn: '1h' }  // Token expiration time: 1 hour
    );
};

// Route handler for warden registration
const register = async (req, res) => {
    const { universityId, password } = req.body;

    try {
        const existingWarden = await Warden.findOne({ universityId });

        if (existingWarden) {
            // If warden already exists, return a 400 response
            return res.status(400).json({ message: 'Warden already registered with this university ID' });
        }

        // Create a new warden and save to the database
        const newWarden = new Warden({ universityId, password });
        await newWarden.save();

        // Return a success message
        res.json({ message: 'Warden registered successfully' });
    } catch (error) {
        // Handle any errors and return a 500 response
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Route handler for warden login
const login = async (req, res) => {
    const { universityId, password } = req.body;

    try {
        // Find warden with the given universityId and password
        const warden = await Warden.findOne({ universityId, password });

        if (!warden) {
            // If no warden found, return a 401 response
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        // Generate a token, update the warden's token in the database
        const token = generateToken(warden._id);
        await Warden.updateOne(
            { _id: warden._id },
            { token }
        );

        // Return the warden details and the token
        res.json({ warden, token });
    } catch (error) {
        // Handle any errors and return a 500 response
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Route handler for warden logout
const logout = async (req, res) => {
    const wardenId = req.user.wardenId;

    try {
        // Update the warden's token to null, indicating logout
        await Warden.updateOne({ _id: wardenId }, { token: null });
        // Return a success message
        res.json({ message: 'Warden logged out successfully' });
    } catch (error) {
        // Handle any errors and return a 500 response
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the route handlers
module.exports = {
    register,
    login,
    logout,
};