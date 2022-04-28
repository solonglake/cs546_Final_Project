const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const users = mongoCollections.users;
const games = mongoCollections.games;
const bcrypt = require('bcrypt');

let exportedMethods = {
    async createGame(gameName, gameImage){
        // input format checking
        if(!gameName){
            throw 'gameName must be supplied!';
        }
        if(!gameImage){
            throw 'Game Image must be supplied!';
        }
        if(typeof(gameName) != 'string'){
            throw 'gameName must be a string!';
        }
        gameName = gameName.trim();
        if(gameName.length < 1){
            throw 'gameName must atleast 2 characters long!';
        }
        if(gameName.match(/^[0-9A-Za-z]+$/) === null){
            throw 'gameName must only use alphanumeric characters!';
        }
        gameName = gameName.toLowerCase();
        
        let res = gameImage.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res === null){
            throw 'Supplied link is not valid!';
        }
        // check if game already exists in the database
        const gamesCollection = await games();
        const game = await gamesCollection.findOne({name: gameName});
        if(game != null){
            throw 'This game already exists';
        }
        //we can check for the image too but that seems unUseful
        // actually add the game
        const insertInfo = await gameCollectiion.insertOne({'name':gameName, 'gameImage': gameImage, 'runs':[]});
        if(insertInfo.insertedCount === 0){
            throw 'Could add game!';
        }
        return {userInserted: true};
    },

    async changeRunsArray(gameName, runs){
        // input format checking
        if(!gameName){
            throw 'gameName must be supplied!';
        }
        if(typeof(gameName) != 'string'){
            throw 'gameName must be a string!';
        }
        gameName = gameName.trim();
        if(gameName.length < 4){
            throw 'Username must atleast 4 characters long!';
        }
        if(gameName.indexOf(' ') != -1){
            throw 'Username cannot contain spaces!';
        }
        if(gameName.match(/^[0-9A-Za-z]+$/) === null){
            throw 'Username must only use alphanumeric characters!';
        }
        gameName = gameName.toLowerCase();
        if(runs.length === 0){
            throw 'runs must not be empty!';
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