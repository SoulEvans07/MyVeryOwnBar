var requireOption = require('../generic/common').requireOption;

/**
 * Delete the ingredient object
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
    	console.log("deleteIngredient()");
        return next();
    };

};
