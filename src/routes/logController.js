module.exports = {
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        } 
        return res.redirect('/login');
    },
    isAdmin: (req, res, next) => {
        if(req.user.admin) {
            return next();
        }
        return res.redirect('/customer#/1');
    }

}