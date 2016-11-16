var requireOption = require('../generic/common').requireOption;

/**
 * Get the cocktail for the cocktailid param
 *  - if there is no such cocktail, redirect to /
 *  - if there is one, put it on res.tpl.cocktail
 */

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
    	console.log("getCocktail()");
        return next();
    };

};
