const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const users = mongoCollections.users;
const usersData = require('./users');
const runs = mongoCollections.runs;

let exportedMethods = {
    async createRun(username, body, time,videoLink, tag){
        // input format checking
        if(!username) throw 'Username must be supplied!';
        if(!body) throw 'Body must be supplied!';
        if(!time) throw 'Time must be supplied!';
        if(!videoLink) throw 'videoLink must be supplied!';
        if(!tag) throw 'tag must be supplied!';

        if(typeof(username) != 'string') throw 'Username must be a string!';
        if(typeof(body) != 'string') throw 'Body must be a string!';
        if(typeof(time) != 'string') throw 'Time must be a string!';
        if(typeof(tag) != 'string') throw 'Tag must be a string!';
        username = username.trim();
        body = body.trim();
        time = time.trim();
        tag = tag.trim();
        if(time.length == 0){
            throw 'Time must be nonempty!';
        }
        if(body.length == 0){
            throw 'Body must be nonempty!';
        }
        if(tag.length == 0){
            throw 'Tag must be nonempty!';
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

        let res = videoLink.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res === null){
            throw 'Supplied link is not valid!';
        }

        // check if user already exists in the database
        
        const usersCollection = await users();
        const user = await usersCollection.findOne({username: username});
        if(user === null){
            throw 'User with supplied username does not exist!';
        }

        

        // actually add the run
        let newRun = {
            userId: user._id.toString(),
            body: body,
            time: time,
            tag: tag,
            video: videoLink
        };
        const runsCollection = await runs();
        const insertInfo = await runsCollection.insertOne(newRun);
        if(insertInfo.insertedCount === 0){
            throw 'Could not add run!';
        }
        
        //Insert runId Into User Database
        //Check if user has runs property, if not make it
        const runId = insertInfo.insertedId.toString();
        let run = user.runs;
        if(run){
            run.push(runId);
        } else {
            run = [runId];
        }
    
        usersCollection.updateOne(
            { username: username }, 
            { '$set': {runs: run} }
        );
        return {runInserted: true};
    },

    async getAllRuns() {
        const runsCollection = await runs();
        const runList = await runsCollection.find({}).toArray();
        if (!runList){
            throw 'Could not get all runs';
        }
        return runList;
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
        const runsCollection = await runs();
        const run = await runsCollection.findOne({ _id: ObjectId(id) });
        if (run === null) throw `Could not find run with id of ${id}`;
        run._id = run._id.toString();
        return run;
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