const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

let exportedMethods = {
    async createUser(username, password, passwordConfirm, email){
        // input format checking
        if(!username){
            throw 'Username must be supplied!';
        }
        if(!password){
            throw 'Password must be supplied!';
        }
        if(!passwordConfirm){
            throw 'Confirmation password must be supplied!';
        }
        if(typeof(username) != 'string'){
            throw 'Username must be a string!';
        }
        username = username.trim();
        if(username.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(username.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }
        if(typeof(password) != 'string'){
            throw 'Password must be a string!';
        }
        password = password.trim();
        if(password.length < 6){
            throw 'Password must atleast 6 characters long!';
        }
        if(password.indexOf(' ') != -1){
            throw 'Password cannot contain spaces!';
        }
        if(typeof(passwordConfirm) != 'string'){
            throw 'Confirmation password must be a string!';
        }
        passwordConfirm = passwordConfirm.trim();
        if(passwordConfirm.length < 6){
            throw 'Confirmation password must atleast 6 characters long!';
        }
        if(passwordConfirm.indexOf(' ') != -1){
            throw 'Confirmation password cannot contain spaces!';
        }
        if(passwordConfirm != password){
            throw 'Passwords do not match!';
        }
        let invalidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        email = email.trim();
        email = email.toLowerCase();
        if(typeof(email) != 'string'){
            throw 'Email must be a string!';
        }
        if(email.length < 1){
            throw 'Must enter a valid Email!';
        }
        if(email.match(invalidEmail) === null){
            throw 'Invalid Email Format!';
        }

        // check if username already exists in the database
        const usersCollection = await users();
        let userNameCase = new RegExp(["^", username, "$"].join(""), "i");
        const user = await usersCollection.findOne({username: userNameCase});
        if(user != null){
            throw 'Already user with the supplied username!';
        }

        // compute random token for new user
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i=0; i<25; i++) {
            token += characters[Math.floor(Math.random() * characters.length)];
        }

        // create transport for node mailer

        let transport = nodemailer.createTransport({
            service: "Yahoo",
            auth: {
              user: process.env.NODE_MAILER_USER,
              pass: process.env.NODE_MAILER_PASS,
            },
        });
        // send email
        await transport.sendMail({
            from: process.env.NODE_MAILER_USER,
            to: email,
            subject: 'Please confirm your account',
            html: 
            `<h1>Email Confirmation</h1>
            <h2>Hello ${username}</h2>
            <p>Thank you for signing up for Split. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:3000/signup/${token}>Click here</a>
            <p>We hope to see your incredible speedruns soon!
            </div>`
        });

        // hash password and add user to database
        const hashedPassword = await bcrypt.hash(password, 16);
        let newUser = {
            username: username,
            password: hashedPassword,
            email: email,
            token, token,
            status: 'pending',
            runs: [],
            posts: []
        };
        const insertInfo = await usersCollection.insertOne(newUser);
        if(insertInfo.insertedCount === 0){
            throw 'Could not add user!';
        }
        return {userInserted: true};
    },
    // async getUsername(id){
    //     if (!id) throw 'ID must be supplied!';
    //     if (typeof id !== 'string') throw 'ID must be a string';
    //     id = id.trim();
    //     if (id.length == 0) throw 'ID must be a nonempty string';
    //     if (!ObjectId.isValid(id)) throw 'invalid object ID';
    // },
    async getUsername(id){
        if (!id) throw 'ID must be supplied!';
        if (typeof id !== 'string') throw 'ID must be a string';
        id = id.trim();
        if (id.length == 0) throw 'ID must be a nonempty string';
        if (!ObjectId.isValid(id)) throw 'invalid object ID';

        const userCollection = await users();
        const user = await userCollection.findOne({ _id: ObjectId(id) });
        if (user === null) throw 'No User exists with this ID';
        return user.username;
    },
    async checkUser(username, password){
        // input format checking
        if(!username){
            throw 'Username must be supplied!';
        }
        if(!password){
            throw 'Password must be supplied!';
        }
        if(typeof(username) != 'string'){
            throw 'Username must be a string!';
        }
        username = username.trim();
        if(username.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(username.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }
        if(typeof(password) != 'string'){
            throw 'Password must be a string!';
        }
        password = password.trim();
        if(password.length < 6){
            throw 'Password must atleast 6 characters long!';
        }
        if(password.indexOf(' ') != -1){
            throw 'Password cannot contain spaces!';
        }

        // check if username and password combination are in the database
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
        if(user === null){
            throw 'Either the username or password is invalid';
        }
        const matching = await bcrypt.compare(password, user.password);
        if(!matching){
            throw 'Either the username or password is invalid';
        }
        if(user.status == 'pending'){
            throw 'Pending Account. Please Verify Your Email!';
        }
        return {authenticated: true};
    },

    async verifyUser(token){
        // input format checking
        if(!token){
            throw 'Token must be supplied!';
        }
        if(typeof(token) != 'string'){
            throw 'Token must be a string!';
        }
        token = token.trim();
        if(token === 0){
            throw 'Token must not be an empty string!';
        }
        
        // get user and change status
        const usersCollection = await users();
        const user = await usersCollection.findOne({token: token});
        if(user === null){
            throw 'User with supplied token does not exist!';
        }
        usersCollection.updateOne(
            { token: token }, 
            { '$set': {status: 'active' } }
        );
        return {username: user.username};
    },
    async getIdByUsername(username)  {
        if (!username) {
            throw 'you must enter a username';
        }
        if (typeof(username) != 'string') {
            throw "useranem must be a string"
        }
        username = username.trim();
        if (username.length < 1) {
            throw "useranme must be longer";
        }
        let usersCollection = await users();
        let answer = await usersCollection.findOne({username: username});
        return answer;

    },
    async changeBio(username, bio){
        // input format checking
        if(!username){
            throw 'Username must be supplied!';
        }
        if(typeof(username) != 'string'){
            throw 'Username must be a string!';
        }
        username = username.trim();
        if(username.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(username.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }
        bio = bio.trim();
        if(bio.length === 0){
            throw 'Bio must not be empty!';
        }
        if(bio.length > 1000){
            throw 'Bio is too long!';
        }

        // update user with new bio
        const usersCollection = await users();
        let userNameCase = new RegExp(["^", username, "$"].join(""), "i");
        const user = await usersCollection.findOne({username: userNameCase});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }
        usersCollection.updateOne(
            { username: username }, 
            { '$set': {bio: bio } }
        );
        return {success: true};
    },

    async getBio(username){
        // input format checking
        if(!username){
            throw 'Username must be supplied!';
        }
        if(typeof(username) != 'string'){
            throw 'Username must be a string!';
        }
        username = username.trim();
        if(username.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(username.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }

        // get profilePic of user with supplied username
        const usersCollection = await users();
        let userNameCase = new RegExp(["^", username, "$"].join(""), "i");
        const user = await usersCollection.findOne({username: userNameCase});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }
        return {bio: user.bio};
    },

    async changeProfilePic(username, link){
        // input format checking
        if(!username){
            throw 'Username must be supplied!';
        }
        if(typeof(username) != 'string'){
            throw 'Username must be a string!';
        }
        username = username.trim();
        if(username.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(username.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }
        let res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res === null){
            throw 'Supplied link is not valid!';
        }

        // update user with new link
        const usersCollection = await users();
        let userNameCase = new RegExp(["^", username, "$"].join(""), "i");
        const user = await usersCollection.findOne({username: userNameCase});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }
        usersCollection.updateOne(
            { username: username }, 
            { '$set': {profilePic: link } }
        );
        return {success: true};
    },

    async getProfilePic(username){
        // input format checking
        if(!username){
            throw 'Username must be supplied!';
        }
        if(typeof(username) != 'string'){
            throw 'Username must be a string!';
        }
        username = username.trim();
        if(username.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(username.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }

        // get profilePic of user with supplied username
        const usersCollection = await users();
        let userNameCase = new RegExp(["^", username, "$"].join(""), "i");
        const user = await usersCollection.findOne({username: userNameCase});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }
        return {link: user.profilePic};
    },

    async getPosts(username){
        // input format checking
        if(!username){
            throw 'Username must be supplied!';
        }
        if(typeof(username) != 'string'){
            throw 'Username must be a string!';
        }
        username = username.trim();
        if(username.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(username.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }

        // get Posts of user with supplied username
        const usersCollection = await users();
        let userNameCase = new RegExp(["^", username, "$"].join(""), "i");
        const user = await usersCollection.findOne({username: userNameCase});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }
        return {posts: user.posts};
    },

    async getRuns(username){
        // input format checking
        if(!username){
            throw 'Username must be supplied!';
        }
        if(typeof(username) != 'string'){
            throw 'Username must be a string!';
        }
        username = username.trim();
        if(username.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(username.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }

        // get Runs of user with supplied username
        const usersCollection = await users();
        let userNameCase = new RegExp(["^", username, "$"].join(""), "i");
        const user = await usersCollection.findOne({username: userNameCase});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }
        return {runs: user.runs};
    },

    async checkUsername(username){
        // input format checking
        if(!username){
            throw 'Username must be supplied!';
        }
        if(typeof(username) != 'string'){
            throw 'Username must be a string!';
        }
        username = username.trim();
        if(username.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(username.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(username.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }


        // check if user exists
        const usersCollection = await users();
        let userNameCase = new RegExp(["^", username, "$"].join(""), "i");
        const user = await usersCollection.findOne({username: userNameCase});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }
        return {success: true};
    }
};

module.exports = exportedMethods;