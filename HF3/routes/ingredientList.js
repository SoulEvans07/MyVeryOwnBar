var renderMW = require('../middlewares/generic/render');

var getIngredientsListMW = require('../middlewares/ingredients/getIngredientList');
var updateIngredientsMW = require('../middlewares/ingredients/updateIngredient');
var getIngredientsMW = require('../middlewares/ingredients/getIngredient');
var deleteIngredientsMW = require('../middlewares/ingredients/deleteIngredient');

var ingredientsModel = {};

module.exports = function (app) {

    var objectRepository = {
        ingredientsModel: ingredientsModel
    };

    /**
     * Show ingredient details
     */

    app.use('/ingredient',
        getIngredientsMW(objectRepository),
        renderMW(objectRepository, 'ingredient')
    );

    /**
     * Edit the ingredients details
     */

    app.use('/ingredients/:ingredientsid/edit',
        getIngredientsMW(objectRepository),
        updateIngredientsMW(objectRepository),
        renderMW(objectRepository, 'editingredient')
    );

    /**
     * Delete ingredients
     * - then redirect to /ingredientss
     */

    app.use('/ingredients/:ingredientid/delete',
        getIngredientsMW(objectRepository),
        deleteIngredientsMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/ingredients');
        }
    );

    /**
     * Add new ingredients
     */

    app.use('/ingredients/new',
        updateIngredientsMW(objectRepository),
        renderMW(objectRepository, 'editingredient')
    );

    /**
     * List all ingredients
     */

    app.use('/ingredients',
        getIngredientsListMW(objectRepository),
        renderMW(objectRepository, 'ingredients')
    );

};

