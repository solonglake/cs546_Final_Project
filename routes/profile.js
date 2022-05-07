const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const forumsData = data.forums;
const xss = require('xss');

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
            username: xss(username),
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

router.get('/posts', async (req, res) => {
    try {
        let username = req.session.user.username;
        let posts = await forumsData.getAllUser(username);  
        res.json(posts);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/runs', async (req, res) => {
    try {
        let username = req.session.user.username;
        let runs = await usersData.getRuns(username);
        res.json(runs);
    }
    catch (e) {
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
            status = await usersData.changeProfilePic(username, xss(profilePicInput));    
        }
        res.json(status);
    } catch (e) {     
        res.sendStatus(500);
    }
});

router.post('/bio', async (req, res) => {
    try {
        let bioInput = req.body.bioInput;
        let username = req.session.user.username;

        // bioInput validation
        let validInput = true;
        bioInput = bioInput.trim();
        if(bioInput.length === 0 || bioInput.length > 1000){
            validInput = false;
        }
        if(validInput){
            let status = await usersData.changeBio(username, xss(bioInput));    
            res.json(status);
        } else {
            res.json({success: false});
        }
    } catch (e) {     
        res.sendStatus(500);
    }
});

router.get('/bio', async (req, res) => {
    try {
        let username = req.session.user.username;
        let bio = await usersData.getBio(username);    
        res.json(bio);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/runs', async (req, res) => {
    try {
        let username = req.session.user.username;
        let runs = await usersData.getRuns(username);    
        res.json(runs);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;