var requireOption = require('../generic/common').requireOption;
var mongoose = require('mongoose');


/**
 * Delete the ingredient object
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
        var id;
        // * validate id in url
        if(req.params.ingredientid.length == 24)
            id = new mongoose.Types.ObjectId( req.params.ingredientid );
        else {
            res.tpl.error.push("invalid ingredient id: " + req.params.ingredientid);
            return next();
        }

        // * query ingredient by id
        ingredientModel.findOne({ _id: id }, function (err, ingredient) {
            if ((err) || (!ingredient)) {
                res.tpl.error.push("no ingredient on id: " + JSON.stringify(id));
                console.log("no ingredient on id: " + JSON.stringify(id));
                return next();
            }

            // * remove ingredient
            ingredient.remove(function (err) {
                if(typeof err !== 'undefined') {
                    res.tpl.error.push("cant remove ingredient on id: " + JSON.stringify(id));
                    res.tpl.error.push(JSON.stringify(err));
                }
                return next();
            });
        });
    };

};
