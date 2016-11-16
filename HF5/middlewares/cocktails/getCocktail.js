var requireOption = require('../generic/common').requireOption;
var multiLine = require('../generic/common').multiLine;
var entities = require('html-entities').AllHtmlEntities;
var mongoose = require('mongoose');


/**
 * Get the cocktail for the cocktailid param
 *  - if there is no such cocktail, redirect to /
 *  - if there is one, put it on res.tpl.cocktail
 */

module.exports = function (objectrepository, edit) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');
    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
        var id;
        // * validate id in url
        if(req.params.cocktailid.length == 24)
            id = new mongoose.Types.ObjectId( req.params.cocktailid );
        else {
            res.tpl.error.push("invalid cocktail id: " + req.params.cocktailid);
            return next();
        }

        // * query cocktail by id, populate ingredient list
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

            // * put cocktail on res.tpl
            res.tpl.cocktail = cocktail;


            // * replace new lines for <br/>
            if(!edit) {
                res.tpl.cocktail.descr = multiLine(res.tpl.cocktail.descr);
                res.tpl.cocktail.recipe = multiLine(res.tpl.cocktail.recipe);
            }

            // * set title
            if(edit){
                res.tpl.title = res.tpl.cocktail.name + ' - Edit';
            } else {
                res.tpl.title = res.tpl.cocktail.name + ' - Cocktail';
            }

            return next();
        });
    };

};
