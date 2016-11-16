var requireOption = require('../generic/common').requireOption;

/**
 * Create (or update) cocktail if we have the data for it
 * update if we have a res.tpl.inventory, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /cocktail/:cocktailid
 */

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
    	console.log("updateCocktail()");
        return next();
    };

};
