const express = require('express');
const router = express.Router();
const data = require('../data');
const forumsData = data.forums;
const usersData = data.users;
const xss = require('xss');
const MarkdownIt = require('markdown-it/lib');
const md = new MarkdownIt();
router.get('/', async (req, res) => {
    try {
        if(req.session.user) {
            res.render('partials/forums', { title: 'Forums',js: 'forums.js',username: xss(req.session.user.username)});
        } else {
            res.render('partials/forums', { title: 'Forums',js: 'forums.js'});
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        req.params.id = await forumsData.checkId(req.params.id);
        const post = await forumsData.get(req.params.id);
        post.comments = await forumsData.formatComments(req.params.id);
        post.title = md.render(post.title);
        post.body = md.render(post.body);
        let userId = await forumsData.checkId(post.userId.toString());
        let postUser = await usersData.getUsername(userId);
        let hasComments = true;
        if(post.comments.length == 0){
            hasComments = false;
        }
        if(req.session.user) {
            res.render('partials/post', { title: 'Forums',js: 'post.js',username: xss(req.session.user.username), post: post, postUser: postUser, comments: post.comments, hasComments: hasComments});
        } else {
            res.render('partials/post', { title: 'Forums',js: 'post.js', post: post, postUser: postUser, comments: post.comments, hasComments: hasComments});
        }
    } catch (e) {
        console.log(e);
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
        try{
        status = await forumsData.createPost(xss(postTitle), xss(postBody),xss(username));    
        } catch(e){ 
            res.sendStatus(500);
        }
        res.json(status);
    } catch (e) {     
        res.sendStatus(500);
    }
});

router.post('/newComment', async (req, res) => {
    try {
        let postId = req.body.postId;
        let commentBody = req.body.commentBody;
        let commentUser = req.body.commentUser;
        let status;
        if(postId.trim().length == 0) status = {commentInserted: false};
        if(commentBody.trim().length == 0) status = {commentInserted: false};
        if(commentUser.trim().length == 0) status = {commentInserted: false};
        try{
        status = await forumsData.createComment(xss(postId), xss(commentBody),xss(commentUser));    
        } catch(e){
            console.log(e);
            res.sendStatus(500);
        }
        res.json(status);
    } catch (e) {   
        console.log(e);  
        res.sendStatus(500);
    }
});
module.exports = router;