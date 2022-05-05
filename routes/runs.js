const express = require('express');
const router = express.Router();
const data = require('../data');
const runsData = data.runs;

router.get('/', async (req, res) => {
    try {
        res.render('partials/runs', { title: 'Runs', js: 'runs.js' });
    } catch (e) {
        res.sendStatus(500);
    }
});


module.exports = router;