var mongoose = require('mongoose');
var uri = 'mongodb://localhost/xk5iv8';

mongoose.connect(uri);
console.log(uri);

module.exports = mongoose;