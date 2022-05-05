const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const users = mongoCollections.users;
const usersData = require('./users');
const games = mongoCollections.games;
const gamesData = require('./games');

let exportedMethods = {
    async createRun(username, gameName, body, time,videoLink, tag){
        // input format checking
        console.log('running create run');
        if(!username) throw 'Username must be supplied!';
        if(!gameName) throw 'Game name must be supplied!';
        if(!time) throw 'Time must be supplied!';
        if(!videoLink) throw 'videoLink must be supplied!';
        if(!tag) throw 'tag must be supplied!';
        if(!body) throw 'body must be supplied!';

        if(typeof(username) != 'string') throw 'Username must be a string!';
        if(typeof(gameName) != 'string') throw 'gameName must be a string!';
        if(typeof(time) != 'string') throw 'Time must be a string!';
        if(typeof(tag) != 'string') throw 'Tag must be a string!';
        if(typeof(body) != 'string') throw 'Body must be a string!';
        username = username.trim();
        time = time.trim();
        tag = tag.trim();
        body = body.trim();
        console.log('time');
        if(time.length != 9){
            throw 'Time must be in input 00.00.000!';
        }
        console.log('length issue good');
        if(isNaN(time.substring(0,2)) || isNaN(time.substring(3,5) || isNaN(time.substring(6,8)))){
            throw 'Time has to contain integers';
        }
        console.log('sub issue good');
        if(time.charAt(2)!='.' || time.charAt(5)!='.'){
            throw 'Time has to have . at third, sixth, and seventh characters';
        }
        console.log('. issue good');
        if(tag.length == 0){
            throw 'Tag must be nonempty!';
        }
        if(body.length == 0){
            throw 'Body must be nonempty!';
        }
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

        let res = videoLink.match(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
        if(res === null){
            throw 'Supplied link is not valid!';
        }

        // check if user already exists in the database
        
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }

        const gamesCollection = await games();
        const game = await gamesCollection.findOne({name: gameName});
        if(game === null){
            throw 'Game with supplied gameName does not exist!';
        }
        
        let RunId = new ObjectId();
        // actually add the run
        let likes = 0;
        let dislikes = 0;
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let newRun = {
            _id: RunId,
            userId: user._id.toString(),
            runUser: username,
            date: date,
            body: body,
            likes: likes,
            dislikes: dislikes,
            time: time,
            tag: tag,
            video: videoLink
        };
        
        //Insert runId Into User Database
        //Check if user has runs property, if not make it
        let userRun = user.runs;
        if(userRun){
            userRun.push(newRun);
        } else {
            userRun = [newRun];
        }
    
        usersCollection.updateOne(
            { username: username }, 
            { '$set': {runs: userRun} }
        );
        let gameRun = game.runs;
        if(gameRun){
            gameRun.push(newRun);
        } else {
            gameRun = [newRun];
        }
    
        gamesCollection.updateOne(
            { name: gameName }, 
            { '$set': {runs: gameRun} }
        );
        return {success: true, id: RunId};
    },

    async getAllRunsGame(gameName) {
        if (arguments.length != 1) {
            throw "Need a gameId";
        }
        if (!gameName) throw 'You must provide an id to search for';
        if (typeof gameName !== 'string') throw 'Id must be a string';
        gameName = gameName.trim();
        if (gameName.length === 0) {
            throw "gameName cannot be empty";
        }
        const gamesCollection = await games();
        const game = await gamesCollection.findOne({ name: gameName });
        if (game === null) throw 'no game with that id';
        return game.runs;
    },

    

    async getRun(id){
        //Input Validation
        if(!id) throw 'Run ID  must be supplied!';
        if(typeof(id) != 'string') throw 'Run ID  must be a string!';   
        id = id.trim();
        if(id.length == 0){
        throw 'Run ID  must be nonempty!';
        }
        if(!ObjectId.isValid(id)) throw "Run ID must be a valid ObjectID!"
        //Make Database Query For Matching RunID
        const gamesCollection = await game();
        const game = await gamesCollection.findOne({'runs._id':ObjectId(id)});
        let ret;
        if (game === null) throw 'No run with that id';
        for(let i = 0; i<game.runs.length; i++){
            if(game.runs[i]._id.toString()==ObjectId(id)){
                game.runs[i]._id = game.runs[i]._id.toString();
                ret= game.runs[i];
            }
        }
    return ret;
    },
    
    async getAllUser(username){
        //Input Validation
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
   
       //Query For User 
       const usersCollection = await users();
       const user = await usersCollection.findOne({username: username});
       if(user === null){
           throw 'No user exists with the supplied username!';
       }
       runIds = user.runs;
       runs = [];
       for(runID of runIds){
           run = await this.get(runID);
           runs.push(run);
       }
       return runs;
    }
};

module.exports = exportedMethods;