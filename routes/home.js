const express = require('express');
const router = express.Router();
const data = require('../data');
const homeData = data.home;

router.get('/', async (req, res) => {
    try {
        res.render('partials/home', { title: 'Split', js: 'home.js' });
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/totalUsers', async (req, res) => {
    try {
        const totalUsers = await homeData.totalUsers();
        res.json({totalUsers: totalUsers});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/totalRuns', async (req, res) => {
    try {
        const totalRuns = await homeData.totalRuns();
        res.json({totalRuns: totalRuns});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/totalGames', async (req, res) => {
    try {
        const totalGames = await homeData.totalGames();
        res.json({totalGames: totalGames});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/totalForums', async (req, res) => {
    try {
        const totalForums = await homeData.totalForums();
        res.json({totalForums: totalForums});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;