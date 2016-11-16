var express = require('express');
var app = express();

var _dirname = 'D:\\Software Programing\\NodeJS\\HF2';

app.use(express.static('static'));

var server = app.listen(3000, function(){
    console.log("Listening... ");
});

app.get('/', function(req, res) {
    console.log("GET " + _dirname + '\\index.html');
    res.sendFile(_dirname + '\\index.html');
});