var requireOption = require('../generic/common').requireOption;

/**
 * Create (or update) ingredient if we have the data for it
 * update if we have a res.tpl.inventory, create if we don't have
 *  - if there is no title, set tpl.error
 *  - if everything is ok redirect to /ingredient/:ingredientid
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
    	// console.log("updateIngredient()");

        res.tpl.editIngredient = true;

        if(res.tpl.ingredient !== undefined)
            res.tpl.title = res.tpl.ingredient.name + " - Edit";
        else {
            res.tpl.title = "New Ingredient";
            res.tpl.ingredient = {
                id : 1,
                name : "new Ingredient",
                img : "ingredient.jpeg",
                desc : "random descrisdmafa",
                have : false
            }
        }

        return next();
    };

};
