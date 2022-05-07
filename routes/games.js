const express = require('express');
const router = express.Router();
const data = require('../data');
const gamesData = data.games;
const xss = require('xss');

router.get('/', async (req, res) => {
    try {
        res.render('partials/games', { title: 'Games', js: 'games.js' });
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/getAllGames', async (req, res) => {
    try {
        let allGames = await gamesData.getAllGames();
        res.json(allGames)
    } catch (e) { 
        res.sendStatus(500);
    }
});


router.post('/addGame', async (req, res) => {
    try {
        let gamePicInput = req.body.gamePicInput;
        let gameNameInput = req.body.gameNameInput;
        let status = {success: true};

        // gamePicInput validation
        let result = gamePicInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(result === null){
            status = {success: false};
        }

        // gameNameInput validation
        gameNameInput = gameNameInput.trim();
        if(gameNameInput.length === 0){
            status = {success: false};
        }

        if(status.success){
            try{
                status = await gamesData.createGame(xss(gamePicInput), xss(gameNameInput));    
            } catch (e) {
                status = {success: false};
            }        
        }
        
        res.json(status);
    } catch (e) {  
        res.sendStatus(500);
    }
});

module.exports = router;