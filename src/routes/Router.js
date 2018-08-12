const logged = require('./logController');

module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('index');
    })

    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        })
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        })
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin.html',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    app.get('/admin', logged.isLoggedIn, (req, res) => {
        res.render('admin');
    })

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
};