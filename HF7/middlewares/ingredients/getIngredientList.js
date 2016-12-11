var requireOption = require('../generic/common').requireOption;

/**
 * Get the ingredient list and put it on res.tpl.ingredients
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
    	//console.log("getIngredeientList()");
        ingredientModel.find().exec(function (err, results) {
            if(err){
                res.tpl.error.push("cannot find ingredients");
                console.log("cannot find ingredients");
                return next;
            }

            res.tpl.ingredients = results;
            return next();
        });
    };

};
