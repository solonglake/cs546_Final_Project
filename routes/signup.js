const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

router.get('/', async (req, res) => {
    try {
        res.render('partials/signup', { title: 'Sign Up' });
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
        // input checking
        let username = req.body.username;
        let password = req.body.password;
        if(!username){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Username not supplied!' });
            return;
        }
        if(!password){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Password not supplied!' });
            return;
        }
        if(typeof(username) != 'string'){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Username must be a string!' });
            return;
        }
        username = username.trim();
        if(username.length < 4){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Username must atleast 4 characters long!' });
            return;
        }
        if(username.indexOf(' ') != -1){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Username cannot contain spaces!' });
            return;
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Username must only use alphanumeric characters!' });
            return;
        }
        username = username.toLowerCase();
        if(typeof(password) != 'string'){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Password must be a string!' });
            return;
        }
        password = password.trim();
        if(password.length < 6){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Password must atleast 6 characters long!' });
            return;
        }
        if(password.indexOf(' ') != -1){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Password cannot contain spaces!' });
            return;
        }

        // database call and rendering
        try {
            const result = await usersData.createUser(username, password);
            if(result.userInserted){
                res.redirect('/login');
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (e) {
            res.status(400).render('partials/signup', { title: 'Sign Up', error: e });
        }       
    } catch (e) {
        res.sendStatus(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        res.render('partials/signup', { title: 'Sign Up' });
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;