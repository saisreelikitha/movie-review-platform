const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword 
        });

        const token = generateToken(user._id);
        res.status(201).json({ 
            token, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken(user._id);
            res.json({ 
                token, 
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
};

exports.updateWatchlist = async (req, res) => {
    try {
        // For demo purposes, just return success
        res.json({ message: 'Watchlist updated successfully', movieId: req.body.movieId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getWatchlist = async (req, res) => {
    try {
        // For demo purposes, return empty watchlist
        res.json([]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
