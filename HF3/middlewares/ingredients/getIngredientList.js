var requireOption = require('../generic/common').requireOption;

/**
 * Get the ingredient list and put it on res.tpl.ingredients
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
    	console.log("getIngredeientList()");
        return next();
    };

};
