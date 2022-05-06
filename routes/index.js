const homeRoutes = require('./home');
const loginRoutes = require('./login');
const signupRoutes = require('./signup');
const gamesRoutes = require('./games');
const gameRoutes = require('./game');
const runRoutes = require('./runs');
const forumsRoutes = require('./forums');
const authenticatedRoutes = require('./authenticated');
const profileRoutes = require('./profile');
const profileVisitRoutes = require('./profileVisit');

const constructorMethod = (app) => {
    app.use('/login', loginRoutes);
    app.use('/signup', signupRoutes);
    app.use('/games', gamesRoutes);
    app.use('/game', gameRoutes);
    app.use('/runs', runRoutes);
    app.use('/forums', forumsRoutes);
    app.use('/profile', profileRoutes);
    app.use('/profileVisit', profileVisitRoutes);
    app.use('/authenticated', authenticatedRoutes);
    app.use('/', homeRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;