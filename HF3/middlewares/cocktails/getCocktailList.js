var requireOption = require('../generic/common').requireOption;

/**
 * Get the cocktail list and put it on res.tpl.cocktails
 */

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
    	console.log("getCocktailList()");
        return next();
    };

};
