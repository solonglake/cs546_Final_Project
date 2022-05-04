const express = require('express');
const router = express.Router();
const data = require('../data');
const runsData = data.runs;

router.get('/', async (req, res) => {
    try {
        res.render('partials/runs', { title: 'Runs', js: 'runs.js' });
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/getRuns', async (req, res) => {
    try {
        let allRuns = await runsData.getAllRuns();
        res.json(allRuns);
    } catch (e) {
        console.log(e);   
        res.sendStatus(500);
    }
});

router.post('/newRun', async (req, res) => {
    try{
        let runTime = req.body.runTime;
        let runVideo = req.body.runVideo;
        let runTag = req.body.runTag;
        let gameName = req.body.gameName;
        let username = req.session.user.username;
        let status;
        if(runTime.trim().length == 0) status = {runInserted: false};
        if(runBody.trim().length == 0) status = {runInserted: false};
        if(runVideo.trim().length == 0) status = {runInserted: false};
        if(runTag.trim().length == 0) status = {runInserted: false};
        if(gameName.trim().length == 0) status = {runInserted: false};
        if(username.trim().length == 0) status = {runInserted: false};
        try{
            status = await runsData.createRun(username, gameName,runTime, runVideo, runTag);    
            } catch(e){
                res.sendStatus(500);
            }
            res.json(status);
        } catch (e) {     
            res.sendStatus(500);
        }

});
module.exports = router;