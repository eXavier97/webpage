const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const favicon = require('serve-favicon');

const { url } = require('./config/database');

const app = express();
mongoose.connect(url, {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

require('./config/passport')(passport);

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({
    secret: 'proyectoprogramacioncomercial',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180*60*1000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});


//Routes
require('./routes/Router')(app, passport);
app.use('/api/customers', require('./routes/customerRoute'));
app.use('/api/employees', require('./routes/employeeRoute'));
app.use('/api/products', require('./routes/productRouter'));
app.use('/api/shippers', require('./routes/shipperRouter'));
app.use('/api/suppliers', require('./routes/supplierRouter'));
app.use('/customer', require('./routes/products'));

//Static files
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use('/css', express.static(__dirname+'/../node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname+'/../node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname+'/../node_modules/popper.js/dist/umd'));
app.use('/js', express.static(__dirname+'/../node_modules/jquery/dist'));

// Server is listening
app.listen(app.get('port'), () => {
    console.log("Connected to server correctly");
})