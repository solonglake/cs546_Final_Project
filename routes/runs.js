const express = require('express');
const router = express.Router();
const data = require('../data');
const gamesData = data.games;
const gameData = data.game;

router.get('/:id', async (req, res) => {
    let runId = req.params.id;
    
    if(!runId){
        res.status(400).json({error:'ID is missing'});
        return;
    }

    if(typeof(runId)!='string' || runId.trim()===0){
        res.status(400).json({ error: 'runId has to be a non-empty string' });
        return;
    }

    try {
        let run = await gameData.getRun(runId);
        let user = req.session.user;
        if(user)
            res.render('partials/runs', { title: 'Runs', user: user.username, name: run.runUser, Tags: run.tags, video:run.video, body: run.body, likes: run.likes, dislikes: run.dislikes, time: run.time, runId: runId, js: 'runs.js' });
        else{
            res.render('partials/runs', { title: 'Runs', name: run.runUser, Tags: run.tags, video:run.video, body: run.body, likes: run.likes, dislikes: run.dislikes, time: run.time, runId: runId, js: 'runs.js' });
        } 
            
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/like', async (req, res) => {
    let runId = req.body.runId;
    let username = req.session.user.username;
    if(!runId){
        res.status(400).json({error:'ID is missing'});
        return;
    }
    if(!username){
        res.status(400).json({error:'username is missing'});
        return;
    }
    if(typeof(runId)!='string' || runId.trim()===0){
        res.status(400).json({ error: 'runId has to be a non-empty string' });
        return;
    }
    if(typeof(username)!='string' || username.trim()===0){
        res.status(400).json({ error: 'username has to be a non-empty string' });
        return;
    }
    try {
        let run = await gameData.incrementLike(runId,username);
        res.json(run);
    } catch(e){
        res.sendStatus(500);
    }
});

router.post('/dislike', async (req, res) => {
    let runId = req.body.runId;
    let username = req.session.user.username;
    if(!runId){
        res.status(400).json({error:'ID is missing'});
        return;
    }
    if(!username){
        res.status(400).json({error:'username is missing'});
        return;
    }
    if(typeof(runId)!='string' || runId.trim()===0){
        res.status(400).json({ error: 'runId has to be a non-empty string' });
        return;
    }
    if(typeof(username)!='string' || username.trim()===0){
        res.status(400).json({ error: 'username has to be a non-empty string' });
        return;
    }
    try {
        let run = await gameData.incrementDislike(runId,username);
        res.json(run);
    } catch(e){
        res.sendStatus(500);
    }
});

router.post('/like', async (req, res) => {
    let runId = req.body.runId;
    let username = req.session.user.username;
    console.log(username);
    if(!runId){
        res.status(400).json({error:'ID is missing'});
        return;
    }
    if(!username){
        res.status(400).json({error:'username is missing'});
        return;
    }
    if(typeof(runId)!='string' || runId.trim()===0){
        res.status(400).json({ error: 'runId has to be a non-empty string' });
        return;
    }
    if(typeof(username)!='string' || username.trim()===0){
        res.status(400).json({ error: 'username has to be a non-empty string' });
        return;
    }
    try {
        let run = await gameData.incrementLike(runId,username);
        res.json(run);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/dislike', async (req, res) => {
    let runId = req.body.runId;
    let username = req.session.user.username;
    let comment = req.body.comment;
    if(!runId){
        res.status(400).json({error:'ID is missing'});
        return;
    }
    if(!username){
        res.status(400).json({error:'username is missing'});
        return;
    }
    if(!comment){
        res.status(400).json({error:'comment is missing'});
        return;
    }
    if(typeof(runId)!='string' || runId.trim()===0){
        res.status(400).json({ error: 'runId has to be a non-empty string' });
        return;
    }
    if(typeof(username)!='string' || username.trim()===0){
        res.status(400).json({ error: 'username has to be a non-empty string' });
        return;
    }
    if(typeof(comment)!='string' || comment.trim()===0){
        res.status(400).json({ error: 'comment has to be a non-empty string' });
        return;
    }
    //do the id type check
    
    try {
        let comment = await gameData.newComment(runId,username, comment);
        res.json(run);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/newComment', async (req, res) => {
    let runId = req.body.runId;
    let username = req.session.user.username;
    let comment = req.body.comment;
    if(!runId){
        res.status(400).json({error:'ID is missing'});
        return;
    }
    if(!username){
        res.status(400).json({error:'username is missing'});
        return;
    }
    if(!comment){
        res.status(400).json({error:'comment is missing'});
        return;
    }
    if(typeof(runId)!='string' || runId.trim()===0){
        res.status(400).json({ error: 'runId has to be a non-empty string' });
        return;
    }
    if(typeof(username)!='string' || username.trim()===0){
        res.status(400).json({ error: 'username has to be a non-empty string' });
        return;
    }
    if(typeof(comment)!='string' || username.trim()===0){
        res.status(400).json({ error: 'comment has to be a non-empty string' });
        return;
    }
    try {
        let newC = await gameData.newComment(runId, username, comment);
        res.json({_id: newC._id, userId: newC.userId, content: newC.content, date: newC.date, username: req.session.user.username});
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}),

//     router.post('/getComments', async (req, res) => {
//         if(!req.body.runId){
//             res.status(400).json({error:'ID is missing'});
//             return;
//         }
//         if(typeof(req.body.runId)!='string' || req.body.runId.trim()===0){
//             res.status(400).json({ error: 'runId has to be a non-empty string' });
//             return;
//         }
//         try {
//             let newC = await gameData.allComments(req.body.runId);
//             console.log("made call")
//             res.json({_id: newC._id, userId: newC.userId, content: newC.content, date: newC.date, username: req.session.user.username});
//         } catch(e){
//             console.log(e);
//             res.sendStatus(500);
//         }
// });



module.exports = router;