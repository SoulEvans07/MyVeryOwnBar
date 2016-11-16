var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Ingredient = db.model('Ingredient', {
    name : String,
    img : String,
    descr : String,
    have : Boolean
});

module.exports = Ingredient;