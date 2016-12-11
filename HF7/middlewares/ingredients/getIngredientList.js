var requireOption = require('../generic/common').requireOption;

/**
 * Get the ingredient list and put it on res.tpl.ingredients
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
    	//console.log("getIngredientList()");
        ingredientModel.find({}, function (err, results) {
            if(err){
                res.tpl.error.push(err);
                res.tpl.error.push("cannot find ingredients");
                // console.log("cannot find ingredients");
                return next();
            }

            res.tpl.ingredients = results.sort(compareIngredients);
            return next();
        });
    };

    function compareIngredients(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase())
            return 1;
        return 0;
    }
};
