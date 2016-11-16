var renderMW = require('../middlewares/generic/render');

var getCocktailListMW = require('../middlewares/cocktails/getCocktailList');
var newCocktailMW = require('../middlewares/cocktails/newCocktail');
var getCocktailMW = require('../middlewares/cocktails/getCocktail');
var deleteCocktailMW = require('../middlewares/cocktails/deleteCocktail');
var saveCocktailMW = require('../middlewares/cocktails/saveCocktail');
var checkForIngredientsMW = require('../middlewares/cocktails/checkForIngredients');
var getIngredientsListMW = require('../middlewares/ingredients/getIngredientList');

var cocktailModel = require('../models/cocktailModel');
var ingredientModel = require('../models/ingredientModel');


module.exports = function (app) {

    var objectRepository = {
        cocktailModel: cocktailModel,
        ingredientModel: ingredientModel
    };


    /**
     * Edit the cocktail details
     */
    app.get('/cocktail/:cocktailid/edit',
        getCocktailMW(objectRepository, true),
        getIngredientsListMW(objectRepository),
        renderMW(objectRepository, 'editcocktail')
    );

    app.post('/cocktail/:cocktailid/edit',
        saveCocktailMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/cocktail/' + res.tpl.redirectid);
        }
    );


    /**
     * Delete cocktail
     * - then redirect to /cocktails
     */
    app.use('/cocktail/:cocktailid/delete',
        getCocktailMW(objectRepository, false),
        deleteCocktailMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/cocktails');
        }
    );


    /**
     * Add new cocktail
     */
    app.get('/cocktail/new',
        newCocktailMW(objectRepository),
        getIngredientsListMW(objectRepository),
        renderMW(objectRepository, 'editcocktail')
    );

    app.post('/cocktail/new',
        saveCocktailMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/cocktail/' + res.tpl.redirectid);
        }
    );


    /**
     * Show cocktail details
     */
    app.use('/cocktail/:cocktailid',
        getCocktailMW(objectRepository, false),
        renderMW(objectRepository, 'cocktail')
    );


    /**
     * List all cocktail
     */
    app.use('/cocktails',
        getCocktailListMW(objectRepository),
        checkForIngredientsMW(objectRepository),
        renderMW(objectRepository, 'cocktails')
    );
};

