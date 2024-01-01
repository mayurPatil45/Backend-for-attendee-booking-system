const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Warden = require('../models/warden');
require('dotenv').config();

const generateToken = (wardenId) => {
    return jwt.sign(
        { wardenId },
        process.env.SECRETKEY,
        { expiresIn: '1h' }
    );
};

const register = async (req, res) => {
    const { universityId, password } = req.body;

    try {
        const existingWarden = await Warden.findOne({ universityId });

        if (existingWarden) {
            return res.status(400).json({ message: 'Warden already registered with this university ID' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newWarden = new Warden({ universityId, password: hashedPassword });
        await newWarden.save();

        res.json({ message: 'Warden registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const { universityId, password } = req.body;

    try {
        const warden = await Warden.findOne({ universityId });

        if (!warden || !(await bcrypt.compare(password, warden.password))) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const token = await generateToken(warden._id);
        await Warden.updateOne({ _id: warden._id }, { token });

        res.json({ warden, token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    const wardenId = req.user.wardenId;

    try {
        await Warden.updateOne({ _id: wardenId }, { token: null });
        res.json({ message: 'Warden logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
    logout,
};
