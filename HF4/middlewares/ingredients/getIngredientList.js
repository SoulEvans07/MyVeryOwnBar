var requireOption = require('../generic/common').requireOption;

/**
 * Get the ingredient list and put it on res.tpl.ingredients
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
    	//console.log("getIngredeientList()");
        res.tpl.ingredients = requireOption(objectrepository, 'ingredients');


        /**
         * Get the next valid id
         */
        var id = 0;
        res.tpl.ingredients.forEach(function (ingredient) {
            if(id == ingredient.id)
                id++;
        });

        res.tpl.nextIngredientId = id;

        return next();
    };

};
