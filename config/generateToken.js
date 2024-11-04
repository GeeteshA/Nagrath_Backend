// # JWT token generator for authentication
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Set the expiration time as needed
    });
};

module.exports = generateToken; // Ensure that you're exporting the function correctly
