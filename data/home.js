const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const users = mongoCollections.users;
const games = mongoCollections.games;
const forums = mongoCollections.forums;

let exportedMethods = {
    async totalUsers(){
        const usersCollection = await users();
        const count = await usersCollection.count();
        return count;
    },

    async totalGames(){
        const gamesCollection = await games();
        const count = await gamesCollection.count();
        return count;
    },

    async totalForums(){
        const forumsCollection = await forums();
        const count = await forumsCollection.count();
        return count;
    },

    async totalRuns(){
        const gamesCollection = await games();
        const gamesList = await gamesCollection.find({}).toArray();
        let count = 0;
        for(let i=0; i<gamesList.length; i++){
            count += gamesList[i].runs.length;
        }
        return count;
    }
}

module.exports = exportedMethods;