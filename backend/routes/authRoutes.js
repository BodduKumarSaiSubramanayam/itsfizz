const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // In a real app, verify email and password against MongoDB user collection
    // For demo purposes, we automatically generate a token
    if(email && password) {
        const token = jwt.sign(
            { id: '12345', email }, 
            process.env.JWT_SECRET || 'aetheria_super_secret', 
            { expiresIn: '30d' }
        );
        res.json({ token, message: "Authentication successful via JWT" });
    } else {
        res.status(400).json({ message: "Invalid email or password" });
    }
});

module.exports = router;
