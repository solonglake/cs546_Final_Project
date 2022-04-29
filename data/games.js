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
    async getGame(gameImage) {
        //search by gameImage since it will be imbedded in teh buttons
        if(!gameImage){
            throw 'Game Image must be supplied!';
        }
        let res = gameImage.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res === null){
            throw 'Supplied link is not valid!';
        }
        // check if game already exists in the database
        const gamesCollection = await games();
        const game = await gamesCollection.findOne({'gameImage': gameImage});
        if(game == null){
            throw "This game Doesn't exist";
        }
    },
    async getAllGames() {
        const gamesCollection = await games();
        const game = await gamesCollection.find();
        return game;
    }
}

module.exports = exportedMethods;