var renderMW = require('../middlewares/generic/render');

var getIngredientsListMW = require('../middlewares/ingredients/getIngredientList');
var newIngredientMW = require('../middlewares/ingredients/newIngredient');
var getIngredientMW = require('../middlewares/ingredients/getIngredient');
var deleteIngredientMW = require('../middlewares/ingredients/deleteIngredient');
var saveIngredientMW = require('../middlewares/ingredients/saveIngredient');
var handleCheckMW = require('../middlewares/ingredients/handleCheck');

var cocktailModel = require('../models/cocktailModel');
var ingredientModel = require('../models/ingredientModel');


module.exports = function (app) {

    var objectRepository = {
        cocktailModel: cocktailModel,
        ingredientModel: ingredientModel
    };


    /**
     * Edit the ingredient details
     */
    app.get('/ingredient/:ingredientid/edit',
        getIngredientMW(objectRepository, true),
        renderMW(objectRepository, 'editingredient')
    );

    app.post('/ingredient/:ingredientid/edit',
        saveIngredientMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/ingredient/' + res.tpl.redirectid);
        }
    );


    /**
     * Delete ingredient
     * - then redirect to /ingredients
     */
    app.use('/ingredient/:ingredientid/delete',
        getIngredientMW(objectRepository, false),
        deleteIngredientMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/ingredients');
        }
    );


    /**
     * Add new ingredient
     */
    app.get('/ingredient/new',
        newIngredientMW(objectRepository),
        renderMW(objectRepository, 'editingredient')
    );

    app.post('/ingredient/new',
        saveIngredientMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/ingredient/' + res.tpl.redirectid);
        }
    );


    /**
     * Show ingredient details
     */
    app.use('/ingredient/:ingredientid',
        getIngredientMW(objectRepository, false),
        renderMW(objectRepository, 'ingredient')
    );


    /**
     * List all ingredients
     */
    app.get('/ingredients',
        getIngredientsListMW(objectRepository),
        renderMW(objectRepository, 'ingredients')
    );


    /**
     * Handle AJAX calls for checkbox
     */
    app.post('/ingredients',
        getIngredientsListMW(objectRepository),
        handleCheckMW(objectRepository)
    );

};

