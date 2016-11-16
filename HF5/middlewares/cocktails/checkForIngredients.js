var requireOption = require('../generic/common').requireOption;

/**
 * Check if the cocktails have all the ingredients for them.
 */

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
        res.tpl.cocktails.forEach(function (cocktail) {
            cocktail.missing = cocktail.ingrs.length;

            cocktail.ingrs.forEach(function (ingredient) {
                if(ingredient.have)
                    cocktail.missing--;
            });
        });

        return next();
    };
};
