const { User } = require("../model/User");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sanitizeUser } = require("../utils");
exports.createUser = async (req, res) => {
    try {
        // Create a new user instance from the request body
        const salt = crypto.randomBytes(16);
        const SECRET_KEY = 'secret';

        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
            const user = new User({ ...req.body, password: hashedPassword, salt });

            // Save the user to the database and return the response
            const response = await user.save();
            req.login(sanitizeUser(response), (err) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
                    res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true, sameSite: 'None',secure:true })
                    // Respond with a 201 status code (Created) and the saved user
                    res.status(201).json({ id: response.id, role: response.role });
                    // res.status(201).json(token);
                }
            })
        }
        );
    } catch (error) {
        // Log the error for debugging purposes
        console.log(error);

        // Respond with a 400 status code (Bad Request) and the error message
        res.status(400).json(error.message);
    }
}

exports.loginUser = async (req, res) => {

    res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true ,sameSite:'none',secure:true})
    res.json(req.user.token)
}

exports.checkUser = async (req, res) => {

    res.json(req.user)
}