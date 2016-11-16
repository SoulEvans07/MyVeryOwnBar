var express = require('express');
var app = express();

var _dirname = 'D:\\Software Programing\\NodeJS\\HF3';

app.use(express.static('static'));

var server = app.listen(80, function(){
    console.log("Listening on 3000 port ");
});

require('./routes/cocktailList')(app);
require('./routes/ingredientList')(app);

app.get('/', function(req, res) {
    console.log("GET " + _dirname + '\\cocktails.html');
    res.sendFile(_dirname + '\\static\\cocktails.html');
});