const homeRoutes = require('./home');
const loginRoutes = require('./login');
const gamesRoutes = require('./games');
const forumsRoutes = require('./forums');

const constructorMethod = (app) => {
    app.use('/login', loginRoutes);
    app.use('/games', gamesRoutes);
    app.use('/forums', forumsRoutes);
    app.use('/', homeRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;