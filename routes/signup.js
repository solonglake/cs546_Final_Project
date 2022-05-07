const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const xss = require('xss');

router.get('/', async (req, res) => {
    try {
        res.render('partials/signup', { title: 'Sign Up' });
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        // id checking
        if(typeof req.params.id != 'string'){
            res.status(400).json({ error: 'Id must be a string!' });
            return;
        }
        req.params.id = req.params.id.trim();
        if(req.params.id.length === 0){
            res.status(400).json({ error: 'Id must not be an empty string!' });
            return;
        }
        
        // load confirmation page
        try {
            const result = await usersData.verifyUser(req.params.id);
            if(result.username){
                res.render('partials/verify', { title: 'Account Confimed', username: xss(result.username)});
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (e) {
            res.status(400).json({ error: e });
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
        // input checking
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let passwordConfirm = req.body.passwordConfirm;
        if(!username){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Username not supplied!' });
            return;
        }
        if(!password){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Password not supplied!' });
            return;
        }
        if(!passwordConfirm){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Confirmation password not supplied!' });
            return;
        }
        if(!email){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Email not supplied!' });
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
        if(typeof(passwordConfirm) != 'string'){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Confirmation password must be a string!' });
            return;
        }
        passwordConfirm = passwordConfirm.trim();
        if(passwordConfirm.length < 6){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Confirmation password must atleast 6 characters long!' });
            return;
        }
        if(passwordConfirm.indexOf(' ') != -1){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Confirmation password cannot contain spaces!' });
            return;
        }
        if(passwordConfirm != password){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Passwords do not match!' });
            return;
        }
        let invalidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        email = email.trim();
        email = email.toLowerCase();
        if(typeof(email) != 'string'){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Email must be a string!' });
            return;
        }
        if(email.length < 1){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Must enter a valid Email!' });
            return;
        }
        if(email.match(invalidEmail) === null){
            res.status(400).render('partials/signup', { title: 'Sign Up', error: 'Invalid Email Format!' });
            return;
        }

        // database call and rendering
        try {
            const result = await usersData.createUser(xss(username), password, passwordConfirm, email);
            if(result.userInserted){
                res.render('partials/unverified', { title: 'Verify Your Account', username: username});
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

module.exports = router;