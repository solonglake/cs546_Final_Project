const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('partials/home', { title: 'Split' });
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;