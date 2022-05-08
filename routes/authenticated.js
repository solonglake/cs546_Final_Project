const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let status;
        if(req.session.user) {
            status = true;
            res.json({ authenticated: status, username: req.session.user.username});
            return;
        } else {
            status = false;
            res.json({ authenticated: status});
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;