var requireOption = require('../generic/common').requireOption;

/**
 * Get the cocktail list and put it on res.tpl.cocktails
 */

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
    	//console.log("getCocktailList()");
        res.tpl.cocktails = requireOption(objectrepository, 'cocktails');


        /**
         * Get the next valid id
         */
        var id = 0;
        res.tpl.cocktails.forEach(function (cocktail) {
            if(id == cocktail.id)
                id++;
        });

        res.tpl.nextCocktailId = id;


        return next();
    };

};
