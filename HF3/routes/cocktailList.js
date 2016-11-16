var renderMW = require('../middlewares/generic/render');
var commonMW = require('../middlewares/generic/common');

var getCocktailListMW = require('../middlewares/cocktails/getCocktailList');
var updateCocktailMW = require('../middlewares/cocktails/updateCocktail');
var getCocktailMW = require('../middlewares/cocktails/getCocktail');
var deleteCocktailMW = require('../middlewares/cocktails/deleteCocktail');

var cocktailModel = {};

module.exports = function (app) {

    var objectRepository = {
        cocktailModel: cocktailModel
    };

    /**
     * Show cocktail details
     */

    app.use('/cocktail',
        getCocktailMW(objectRepository),
        renderMW(objectRepository, 'cocktail')
    );

    /**
     * Edit the cocktail details
     */

    app.use('/cocktails/:cocktailid/edit',
        getCocktailMW(objectRepository),
        updateCocktailMW(objectRepository),
        renderMW(objectRepository, 'editcocktail ')
    );

    /**
     * Delete cocktail
     * - then redirect to /cocktails
     */

    app.use('/cocktails/:cocktailid/delete',
        getCocktailMW(objectRepository),
        deleteCocktailMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/cocktails');
        }
    );

    /**
     * Add new cocktail
     */

    app.use('/cocktails/new',
        updateCocktailMW(objectRepository),
        renderMW(objectRepository, 'editcocktail')
    );

    /**
     * List all cocktail
     */

    app.use('/cocktails',
        getCocktailListMW(objectRepository),
        renderMW(objectRepository, 'cocktails')
    );

};

