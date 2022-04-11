const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('partials/forums', { title: 'Forums' });
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;