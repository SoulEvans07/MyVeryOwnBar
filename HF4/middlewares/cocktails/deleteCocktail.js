var requireOption = require('../generic/common').requireOption;

/**
 * Delete the cocktail object
 */

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
    	console.log("deleteCocktail()");
        return next();
    };

};
