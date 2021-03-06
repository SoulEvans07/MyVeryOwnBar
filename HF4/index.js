var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');


var port = 3000;
var _dirname = 'D:\\Software Programing\\NodeJS\\MyVeryOwnBar\\HF4\\';


//Serve static before session
app.use(express.static(_dirname + 'public'));


/**
 * Let's create the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});


/**
 * Include all the routes
 */
require('./routes/cocktailList')(app);
require('./routes/ingredientList')(app);

/**
 * Redirect main to /cocktails
 */
app.use('/', function (req, res, next) {
    return  res.redirect('/cocktails');
})


/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Houston, we had a problem!');

    //Flush out the stack to the console
    if(res.tpl.error.length > 0)
        console.error("[OWN] " + res.tpl.error);
    console.error("[---------------------Stack---------------------]")
    console.error(err.stack);
    console.error("[-----------------------------------------------]")
});


var server = app.listen(port, function(){
    console.log("Listening on " + port + " port ");
});