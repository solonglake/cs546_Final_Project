const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');

let exportedMethods = {
    async createUser(username, password){
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
        username = username.toLowerCase();
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

        // check if username already exists in the database
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
        if(user != null){
            throw 'Already user with the supplied username!';
        }

        // hash password and add user to database
        const hashedPassword = await bcrypt.hash(password, 16);
        let newUser = {
            username: username,
            password: hashedPassword
        };
        const insertInfo = await usersCollection.insertOne(newUser);
        if(insertInfo.insertedCount === 0){
            throw 'Could not add user!';
        }
        return {userInserted: true};
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
        username = username.toLowerCase();
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
        return {authenticated: true};
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
        username = username.toLowerCase();
        bio = bio.trim();
        if(bio.length === 0){
            throw 'Bio must not be empty!';
        }

        // update user with new bio
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
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
        username = username.toLowerCase();

        // get profilePic of user with supplied username
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
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
        username = username.toLowerCase();
        let res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res === null){
            throw 'Supplied link is not valid!';
        }

        // update user with new link
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
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
        username = username.toLowerCase();

        // get profilePic of user with supplied username
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
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
        username = username.toLowerCase();

        // get profilePic of user with supplied username
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
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
        username = username.toLowerCase();

        // get profilePic of user with supplied username
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }
        return {runs: user.runs};
    }
};

module.exports = exportedMethods;