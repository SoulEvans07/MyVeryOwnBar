var requireOption = require('../generic/common').requireOption;
var mongoose = require('mongoose');
var entities = require('html-entities').AllHtmlEntities;

module.exports = function (objectrepository, edit) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res, next) {
        var ingredientid = mongoose.Types.ObjectId(req.body.ingredientid);

        ingredientModel.findOne({_id: ingredientid}).exec(function (err, ingredient) {
            // * check for errors
            if (typeof err !== 'undefined')
                res.tpl.error.push(JSON.stringify(err));

            if (ingredient == null){
                ingredient = new ingredientModel();
                ingredient.img = 'ingredient.jpeg';
                ingredient.have = false;
            }

            ingredient.name = entities.encode(  req.body.name );
            ingredient.descr = entities.encode( req.body.description );
            ingredient.img = entities.encode( req.body.imgurl );

            ingredient.save(function (err) {
                if (err)
                    res.tpl.error.push("error while saving : " + JSON.stringify(ingredient));
                // * saved!
                res.tpl.redirectid = ingredient._id;

                return next();
            });
        });
    };
};
