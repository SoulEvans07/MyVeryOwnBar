var requireOption = require('../generic/common').requireOption;
var mongoose = require('mongoose');
var entities = require('html-entities').AllHtmlEntities;

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
        var cocktailid = mongoose.Types.ObjectId(req.body.cocktailid);

        cocktailModel.findOne({_id: cocktailid}).exec(function (err, cocktail) {
            // * check for errors
            if (typeof err !== 'undefined')
                res.tpl.error.push(JSON.stringify(err));

            if (cocktail == null){
                cocktail = new cocktailModel();
                cocktail.img = 'glass.jpg';
            }

            cocktail.name = entities.encode( req.body.name );
            cocktail.descr = entities.encode( req.body.description );
            cocktail.recipe = entities.encode( req.body.recipe );
            cocktail.img = entities.encode( req.body.imgurl );
            cocktail.ingrs = req.body.ingredients;

            cocktail.save(function (err) {
                if (err)
                    res.tpl.error.push("error while saving : " + JSON.stringify(cocktail));
                // * saved!
                res.tpl.redirectid = cocktail._id;

                return next();
            });
        });
    };
};
