var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var nav = require('./src/config/navigationBar');
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')();
var authRouter = require('./src/routes/authRoutes')();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(session({secret: 'library'})) // Secret can be anything
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res){
    res.render('index', {title: 'ACME Financials', nav: [{Link:'Account', Text:'Account'}]});
});

app.listen(port, function(err){
   console.log('Running server on port: ' + port);
});