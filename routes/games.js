const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const gamesData = data.games;

router.get('/', async (req, res) => {
    try {
        res.render('partials/games', { title: 'Games' });
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/getAll', async (req,res) => {
    try {
        let allGames = await gamesData.getAllGames();
        res.json(allGames)
    } catch (e) {
        res.sendStatus(500);
    }
})

// router.post('/gamePic', async (req, res) => {
//     try {
//         let gamePicInput = req.body.gamePicImnput;
//         let gameName = req.body.gameName;
//         let result = gamePicInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
//         let status;
//         if(result === null){
//             status = {success: false};
//         } else {
//             status = await gamesData.createGame(gameName, gamePicInput);    
//         }
//         res.json(status);
//     } catch (e) {     
//         res.sendStatus(500);
//     }
// });
module.exports = router;
