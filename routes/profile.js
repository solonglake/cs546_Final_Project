const express = require('express');
const router = express.Router();

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy();
        res.render('partials/home', { title: 'Split', js: 'home.js' });
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/', async (req, res) => {
    try {
        let username = req.session.user.username;
        res.render('partials/profile', {
            title: 'Profile', 
            username: username,
            js: 'profile.js'
        });
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/profilePic', async (req, res) => {
    try {
        let profilePicInput = req.body.profilePicInput;
        console.log(profilePicInput);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;