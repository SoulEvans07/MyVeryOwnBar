var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Cocktail = db.model('Cocktail', {
    name: String,
    img: String,
    descr: String,
    recipe: String,
    ingrs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        }
    ]
});

module.exports = Cocktail;