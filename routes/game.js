const express = require('express');
const router = express.Router();
const data = require('../data');
const gamesData = data.games;
const runsData = data.game;



router.post('/getRuns', async (req, res) => {
    try {
        let name = req.body.name;
        let status = {success: true};

        name = name.trim();
        if(!name || name.length===0){
            status = {success: false};
        }

        if(status.success){
            try{
                let allRuns = await runsData.getAllRunsGame(name);
                res.json(allRuns);
                return;
            }catch(e){
                console.log('here?');
                status = {success: false};
            }
        }
        
        res.json(status);
    } catch (e) {
        console.log('here');
        res.sendStatus(500);
    }
});



router.post('/newRun', async (req, res) => {
    try{
        let runTime = req.body.runTime;
        let runVideo = req.body.runVideo;
        let runBody = req.body.runBody;
        let runTag = req.body.runTag;
        let gameName = req.body.runGame;
        let username = req.session.user.username;

        let status = {success: true};
        if(runTime.trim().length == 0) status = {success: false};
        if(runVideo.trim().length == 0) status = {success: false};
        if(runBody.trim().length == 0) status = {success: false};
        if(runTag.trim().length == 0) status = {success: false};
        if(gameName.trim().length == 0) status = {success: false};
        if(username.trim().length == 0) status = {success: false};
        let dummy = runVideo.match(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
        if(dummy === null){
            status = {success: false};
        }
        console.log(status);
        if(status.success){
            try{
                status = await runsData.createRun(username, gameName, runBody, runTime, runVideo, runTag);    
                } catch(e){
                    console.log(e);
                    status = {success: false};
                }
        } 
            res.json(status);
        } catch (e) {
            console.log(req.body);
            console.log(e);
            res.sendStatus(500);
        }

});
router.get('/:id', async (req, res) => {
        let gamename = req.params.id;
    if (!gamename) {
        res.status(400).json({ error: 'ID is missing' });
        return;
    }
    if(typeof(gamename)!='string' || gamename.trim()===0){
        res.status(400).json({ error: 'game name has to be a non-empty string' });
        return;
    }
    
    try {
        await gamesData.getGame(gamename);
        if(req.session.user){
            res.render('partials/game', {title:gamename, name:gamename,username: req.session.user.username,js: 'game.js'});
        }
        else{
            res.render('partials/game', {title:gamename, name:gamename,js: 'game.js'});
        }
    }catch (e) {
        console.log(res.session);
        res.sendStatus(500);
    }
});



module.exports = router;