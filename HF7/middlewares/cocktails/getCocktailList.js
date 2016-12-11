var requireOption = require('../generic/common').requireOption;

/**
 * Get the cocktail list and put it on res.tpl.cocktails
 */

module.exports = function (objectrepository) {

    var cocktailModel = requireOption(objectrepository, 'cocktailModel');

    return function (req, res, next) {
        cocktailModel.find({}).populate('ingrs').exec(function (err, results) {
            if(err){
                res.tpl.error.push("cannot find cocktails");
                console.log("cannot find cocktails");
                return next();
            }

            res.tpl.cocktails = results.sort(compareCocktails);
            return next();
        });
    };

    function compareCocktails(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase())
            return 1;
        return 0;
    }

};
