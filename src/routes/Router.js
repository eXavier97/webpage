const logged = require('./logController');
const User = require('../models/customers');

module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('index');
    })

    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        })
    });

    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                if (user.admin)
                    return res.redirect('/admin');
                return res.redirect('/customer#/1');
            });
        })(req, res, next);
    });

    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        })
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/customer#/1',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/admin', logged.isLoggedIn, logged.isAdmin, (req, res) => {
        res.render('admin');
    })

    app.get('/logout', (req, res) => {
        if (req.session && req.session.passport.user) {
            User.findOne({ '_id': req.session.passport.user })
                .then(user => {
                    user.cart = req.session.car;
                    user.save()
                        .catch(err => {
                            console.log(err);
                        })
                    req.session.destroy();
                })
                .catch(err => console.log(err));
        }
        req.logout();
        res.redirect('/');
    })

    app.get('/customer', logged.isLoggedIn,(req, res) => {
        res.render('customer');
    })

    app.get('/order',(req, res) => {
        res.render('order');
    })
};