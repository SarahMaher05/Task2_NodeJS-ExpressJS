// app.js (The Final Glue)

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); 
const MongoStore = require('connect-mongo'); 
const dotenv = require('dotenv');
const path = require('path'); 

const authRoutes = require('./routes/auth.routes');
const characterRoutes = require('./routes/character.routes');

dotenv.config();

const app = express();

const PORT = 3000; 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" SUCCESS: Connected to MongoDB! (NevermoreAppDB)"))
    .catch(err => console.error(" ERROR: Could not connect to MongoDB.", err));

app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }) 
}));

app.use('/auth', authRoutes); 
app.use('/characters', characterRoutes);

app.get('/', (req, res) => {
    res.redirect('/auth/login'); 
});

app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(` Nevermore App is running on port ${PORT}`); 
    console.log(` Open this link in your browser: http://localhost:${PORT}`);
    console.log(`================================================`);
});