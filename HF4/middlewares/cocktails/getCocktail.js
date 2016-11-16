var requireOption = require('../generic/common').requireOption;

/**
 * Get the cocktail for the cocktailid param
 *  - if there is no such cocktail, redirect to /
 *  - if there is one, put it on res.tpl.cocktail
 */

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
        var id = req.params.cocktailid;
        //console.log("getCocktail(" + id + ")");

        res.tpl.cocktail = requireOption(objectrepository, 'cocktails')[id];
        res.tpl.ingredients = requireOption(objectrepository, 'ingredients');

        if (res.tpl.cocktail == undefined)
            res.tpl.error.push("no cocktail on id: " + id);
        else {
            res.tpl.cocktail.ingredients = [];

            res.tpl.ingredients.forEach(function (ingr) {
                if (res.tpl.cocktail.ingrs.indexOf(ingr.id) != -1) {
                    res.tpl.cocktail.ingredients.push(ingr);
                }
            });
        }

        return next();
    };

};
