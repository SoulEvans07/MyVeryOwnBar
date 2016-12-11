var requireOption = require('../generic/common').requireOption;
var multiLine = require('../generic/common').multiLine;
var entities = require('html-entities').AllHtmlEntities;
var mongoose = require('mongoose');


/**
 * Get the ingredient for the ingredientid param
 *  - if there is no such ingredient, redirect to /
 *  - if there is one, put it on res.tpl.ingredient
 */

module.exports = function (objectrepository, edit) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
        var id;
        // * validate id in url
        try {
            id = new mongoose.Types.ObjectId( req.params.ingredientid );
        } catch (e){
            res.tpl.error.push('invalid ingredient id: ' + req.params.ingredientid);
            res.tpl.error.push('(' + e.message + ')');
            return next();
        }

        // * query ingredient by id
        ingredientModel.findOne({ _id: id }, function (err, ingredient) {
            // * check for errors or empty result
            if (err) {
                res.tpl.error.push(JSON.stringify(err));
                return next();
            }
            if (!ingredient) {
                res.tpl.error.push("no ingredient on id: " + JSON.stringify(id));
                return next();
            }

            // * put ingredient on res.tpl
            res.tpl.ingredient = ingredient;

            // * replace new lines for <br/>
            if(!edit) {
                res.tpl.ingredient.descr = multiLine(res.tpl.ingredient.descr);
            }

            // * set title
            if(edit){
                res.tpl.title = res.tpl.ingredient.name + ' - Edit';
            } else {
                res.tpl.title = res.tpl.ingredient.name;
            }

            return next();
        });
    };

};
