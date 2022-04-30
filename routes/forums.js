const express = require('express');
const router = express.Router();
const data = require('../data');
const forumsData = data.forums;

router.get('/', async (req, res) => {
    try {
        res.render('partials/forums', { title: 'Forums',js: 'forums.js'});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/posts', async (req, res) => {
    try {

        try{
            posts = await forumsData.getAll();    
            } catch(e){
                console.log(e);
            }
        res.json(posts)
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/newPost', async (req, res) => {
    try {
        let postTitle = req.body.postTitle;
        let postBody = req.body.postBody;
        let username = req.session.user.username;
        let status;
        if(postTitle.trim().length == 0) status = {postInserted: false};
        if(postBody.trim().length == 0) status = {postInserted: false};
        console.log("Checkmark 1");
        try{
        status = await forumsData.createPost(postTitle, postBody,username);    
        } catch(e){
            console.log(e);
        }
        console.log("Checkmark 2");
        res.json(status);
    } catch (e) {     
        res.sendStatus(500);
    }
});

module.exports = router;