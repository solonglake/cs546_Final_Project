const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

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

router.get('/profilePic', async (req, res) => {
    try {
        let username = req.session.user.username;
        let link = await usersData.getProfilePic(username);    
        res.json(link);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/profilePic', async (req, res) => {
    try {
        let profilePicInput = req.body.profilePicInput;
        let username = req.session.user.username;
        let result = profilePicInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        let status;
        if(result === null){
            status = {success: false};
        } else {
            status = await usersData.changeProfilePic(username, profilePicInput);    
        }
        res.json(status);
    } catch (e) {     
        res.sendStatus(500);
    }
});

module.exports = router;