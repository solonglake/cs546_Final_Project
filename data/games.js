const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const games = mongoCollections.games;

let exportedMethods = {
    async createGame(gameImage, gameName){
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
            throw 'gameName must atleast 1 characters long!';
        }
        if(gameName.match(/^[\w\-\s]+$/) === null){
            throw 'gameName must only use alphanumeric characters or spaces!';
        }
        
        let res = gameImage.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res === null){
            throw 'Supplied link is not valid!';
        }

        // check if game already exists in the database
        const gamesCollection = await games();
        let gameNameCase = new RegExp(["^", gameName, "$"].join(""), "i");
        const game = await gamesCollection.findOne({name: gameNameCase});
        if(game != null){
            throw 'This game already exists';
        }

        // actually add the game
        let newGame = {
            name: gameName,
            gamePic: gameImage,
            runs: []
        };
        const insertInfo = await gamesCollection.insertOne(newGame);
        if(insertInfo.insertedCount === 0){
            throw 'Could not add game!';
        }
        return {success: true};
    },

    async getAllGames() {
        const gamesCollection = await games();
        const gamesList = await gamesCollection.find({}).toArray();
        if (!gamesList){
            throw 'Could not get all games';
        }
        return gamesList;
    },
    async getGame(name) {
        if(!name) throw 'Game name must be supplied!';
        if(typeof(name) != 'string') throw 'Game ID  must be a string!';   
        name = name.trim();
        if(name.length == 0){
            throw 'Game name must be nonempty!';
        }
        if(name.length == 0){
            throw 'Game Name  must be nonempty!';
        }
        if(name.match(/^[\w\-\s]+$/) === null){
            throw 'Game name must only use alphanumeric characters!';
        }
        //Make Database Query For Matching PostID
        const gamesCollection = await games();
        const game = await gamesCollection.findOne({ name: name });
        if (game === null) throw `Could not find game with name of ${name}`;

        return {success: true};
    }

}

module.exports = exportedMethods;