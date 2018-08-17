const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/customers');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses email and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            User.findOne({ 'email': email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'Usuario ya existe'));
                } else {
                    var newUser = new User(req.body);
                    //newUser.local.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) { throw err; }
                        return done(null, newUser);
                    });
                }
            });
        }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({ 'email': email }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'Usuario no encontrado'));
            }
            if (!user.validatePassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Contraseña Incorrecta'));
            }
            req.session.car = user.cart || {};
            return done(null, user);
        });
    }));
}