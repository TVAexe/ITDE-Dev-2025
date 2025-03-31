const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db.js');
const signup = async (req, res) => {
    // const { firstName, lastName, email, password } = req.body;

    // try {
    //     // Check if the user already exists
    //     const userExists = await pool.query('SELECT * FROM  WHERE email = $1', [email]);
    //     if (userExists.rows.length > 0) {
    //         return res.status(400).json({ error: 'User already exists' });
    //     }

    //     const saltRounds = 10;
    //     const hashedPassword = await bcrypt.hash(password, saltRounds);

    //     // Insert new user into database
    //     await pool.query('INSERT INTO account (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', [firstName, lastName, email, hashedPassword]);

    //     res.status(201).json({ message: 'User registered successfully' });
    // } catch (error) {
    //     console.error('Error during signup:', error);
    //     res.status(500).json({ error: 'Database error' });
    // }
};

const login = async (req, res) => {
    const { studentId: username, password } = req.body;

    try {
        // Find the user
        const userResult = await pool.query('SELECT * FROM account WHERE username = $1', [username]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const user = userResult.rows[0];

        // Compare the password
        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({studentId: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        const userInfo = await pool.query('SELECT * FROM student WHERE id = $1', [username]);

        res.json({
            message: 'Login successful',
            token,
            userInfo: userInfo.rows[0],
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Database error' });
    }
};



module.exports = {
    login,
    signup,
};
