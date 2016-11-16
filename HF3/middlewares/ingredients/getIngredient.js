var requireOption = require('../generic/common').requireOption;

/**
 * Get the ingredient for the ingredientid param
 *  - if there is no such ingredient, redirect to /
 *  - if there is one, put it on res.tpl.ingredient
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
    	console.log("getIngredient()");
        return next();
    };

};
