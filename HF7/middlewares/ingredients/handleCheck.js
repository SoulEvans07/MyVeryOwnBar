var requireOption = require('../generic/common').requireOption;
var mongoose = require('mongoose');

/**
 * Handle the ajax call from the client side checkbox on the ingredients page.
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res) {
        var id = new mongoose.Types.ObjectId(req.body.ingredient);
        var have = req.body.checked;

        // console.log("ajax call - body: " + JSON.stringify(req.body));

        res.tpl.ingredients.forEach(function (ingredient) {
            if(ingredient._id == id.toString()) {
                ingredient.have = have;
                ingredient.save(function (err) {
                    if(err){
                        res.tpl.error.push("cannot find ingredients");
                        console.log("cannot find ingredients");
                    }
                });

                res.end();
            }
        });
    };

};