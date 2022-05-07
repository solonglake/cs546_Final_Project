const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const forumsData = data.forums;
const runsData = data.game;

router.get('/:id', async (req, res) => {
    try {
        // check if supplied username is valid
        let username = req.params.id;
        if(!username){
            res.status(400);
            return;
        }
        if(typeof(username) != 'string'){
            res.status(400);
            return;
        }
        username = username.trim();
        if(username.length < 4){
            res.status(400);
            return;
        }
        if(username.indexOf(' ') != -1){
            res.status(400);
            return;
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            res.status(400);
            return;
        }

        //check if user with username exists
        try{
            await usersData.checkUsername(username);
        } catch (e) {
            res.status(404).json({ error: 'No user with the supplied username!' });;
            return;
        }

        // render page
        res.render('partials/profileVisit', {
            title: 'Profile Visit', 
            username: username,
            js: 'profileVisit.js'
        });
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/gameName', async (req, res) => {
    let holder = Object.keys(req.body);
    let gameName = await runsData.getGameByRunId(holder[0]);
    if (!gameName) {
        res.status(400).json({ error: 'ID is missing' });
        return;
    }
    res.json(gameName);
})

router.post('/profilePic', async (req, res) => {
    try {
        let username = req.body.username;
        if(!username){
            res.status(404);
            return;
        }
        if(typeof(username) != 'string'){
            res.status(404);
            return;
        }
        username = username.trim();
        if(username.length < 4){
            res.status(404);
            return;
        }
        if(username.indexOf(' ') != -1){
            res.status(404);
            return;
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            res.status(404);
            return;
        }

        let link = await usersData.getProfilePic(username);    
        res.json(link);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/bio', async (req, res) => {
    try {
        let username = req.body.username;
        if(!username){
            res.status(404);
            return;
        }
        if(typeof(username) != 'string'){
            res.status(404);
            return;
        }
        username = username.trim();
        if(username.length < 4){
            res.status(404);
            return;
        }
        if(username.indexOf(' ') != -1){
            res.status(404);
            return;
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            res.status(404);
            return;
        }

        let bio = await usersData.getBio(username);    
        res.json(bio);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/posts', async (req, res) => {
    try {
        let username = req.body.username;
        if(!username){
            res.status(404);
            return;
        }
        if(typeof(username) != 'string'){
            res.status(404);
            return;
        }
        username = username.trim();
        if(username.length < 4){
            res.status(404);
            return;
        }
        if(username.indexOf(' ') != -1){
            res.status(404);
            return;
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            res.status(404);
            return;
        }

        let posts = await forumsData.getAllUser(username);  
        res.json(posts);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/runs', async (req, res) => {
    try {
        let username = req.body.username;
        if(!username){
            res.status(404);
            return;
        }
        if(typeof(username) != 'string'){
            res.status(404);
            return;
        }
        username = username.trim();
        if(username.length < 4){
            res.status(404);
            return;
        }
        if(username.indexOf(' ') != -1){
            res.status(404);
            return;
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            res.status(404);
            return;
        }
        
        let runs = await usersData.getRuns(username);    
        res.json(runs);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;