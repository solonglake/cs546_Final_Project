const express = require('express');
const router = express.Router();
const data = require('../data');
const gamesData = data.games;
const runsData = data.game;
const xss = require('xss');

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
                status = {success: false};
            }
        }
        
        res.json(status);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/newRun', async (req, res) => {
    try{
        let runHour = req.body.runHour;
        let runMin = req.body.runMin;
        let runSec = req.body.runSec;
        let runVideo = req.body.runVideo;
        let runBody = req.body.runBody;
        let gameName = req.body.runGame;
        let username = req.session.user.username;
        let tags = req.body.tags;

        let status = {success: true};
        if(runHour<=0 && runMin<=0 && runSec<=0) status = {success: false};
        if(runHour<0) status = {success: false};
        if(runMin<0 || runMin>=60) status = {success: false};
        if(runSec<0 || runSec>=60) status = {success: false};
        if(runVideo.trim().length == 0) status = {success: false};
        if(runBody.trim().length == 0) status = {success: false};
        if(gameName.trim().length == 0) status = {success: false};
        if(username.trim().length == 0) status = {success: false};
        if(tags.length === 0) status = {success: false};
        let dummy = runVideo.match(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
        if(dummy === null){
            status = {success: false};
        }

        if(status.success){
            console.log(runHour);
            console.log(runMin);
            console.log(runSec);
            console.log(runHour*3600);
            console.log(runMin*60);
            console.log((runHour*3600)+(runMin*60)+14)
            console.log(typeof(runSec));
            let h = runHour*3600;
            let m = runMin*60;

            let runTime = (runHour*3600) + (runMin*60) + (runSec*1);
            console.log(runTime);
            try{   
                status = await runsData.createRun(xss(username), xss(gameName), xss(runBody), xss(runTime), xss(runVideo), tags);    
            } catch (e) {
                status = {failure: e};
            }
        } 

        res.json(status);
    } catch (e) {
        res.sendStatus(500);
    }
});
router.post('/gameName', async (req, res) => {
    let runId = req.body.runs;
    let gamename;
    try {
        gamename = await runsData.getGameByRunId(runId);
    } catch(e){
        console.log(e); 
        res.sendStatus(500);   
    }
    res.json(gamename);
})
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
        res.sendStatus(500);
    }
});

module.exports = router;