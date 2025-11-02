// controllers/auth.controller.js


const User = require('../models/user.model'); 
const bcrypt = require('bcrypt');


exports.showRegisterForm = (req, res) => {
    res.render('register'); 
};


exports.registerUser = async (req, res) => {
    try {
        
        const { username, password } = req.body;

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = new User({
            username: username,
            password: hashedPassword 
        });
        await user.save();

        
        res.redirect('/auth/login');

    } catch (error) {
        console.log(error);
        res.redirect('/auth/register');
    }
};


exports.showLoginForm = (req, res) => {
    res.render('login'); 
};


exports.loginUser = async (req, res) => {
    try {
        
        const { username, password } = req.body;

        
        const user = await User.findOne({ username: username });

        
        if (!user) {
            return res.redirect('/auth/login'); 
        }

        
        const isMatch = await bcrypt.compare(password, user.password);

        
        if (!isMatch) {
            return res.redirect('/auth/login'); 
        }

        
        req.session.userId = user._id;
        
        
        res.redirect('/characters');

    } catch (error) {
        console.log(error);
        res.redirect('/auth/login');
    }
};


exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/characters');
        }
        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
};