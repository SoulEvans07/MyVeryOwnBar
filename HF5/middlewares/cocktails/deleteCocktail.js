var requireOption = require('../generic/common').requireOption;
var mongoose = require('mongoose');


/**
 * Delete the cocktail object
 */

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
        var id;
        // * validate id in url
        if(req.params.cocktailid.length == 24)
            id = new mongoose.Types.ObjectId( req.params.cocktailid );
        else {
            res.tpl.error.push("invalid cocktail id: " + req.params.cocktailid);
            return next();
        }

        // * query cocktail by id
        cocktailModel.findOne({ _id: id }).populate('ingrs').exec(function (err, cocktail) {
            // * check for errors or empty result
            if ((err) || (!cocktail)) {
                if(typeof err !== 'undefined') {
                    res.tpl.error.push("no cocktail on id: " + JSON.stringify(id));
                    res.tpl.error.push(JSON.stringify(err));
                } else {
                    console.log("no cocktail on id: " + JSON.stringify(id));
                }
                return next();
            }

            // * remove cocktail
            cocktail.remove(function (err) {
                if(typeof err !== 'undefined') {
                    res.tpl.error.push("cant remove cocktail on id: " + JSON.stringify(id));
                    res.tpl.error.push(JSON.stringify(err));
                }
                return next();
            });
        });
    };

};
