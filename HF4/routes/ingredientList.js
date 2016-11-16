var renderMW = require('../middlewares/generic/render');

var getIngredientsListMW = require('../middlewares/ingredients/getIngredientList');
var updateIngredientsMW = require('../middlewares/ingredients/updateIngredient');
var getIngredientsMW = require('../middlewares/ingredients/getIngredient');
var deleteIngredientsMW = require('../middlewares/ingredients/deleteIngredient');
var handleCheckMW = require('../middlewares/ingredients/handleCheck');

var ingredientsModel = {};

var dummyCocktails = [
    {
        id: 0,
        name : "Manhattan",
        img : "manhattan.jpg",
        descr : "text",
        recipe : "recipeText",
        ingrs : [0, 2]
    },
    {
        id: 1,
        name : "Martini",
        img : "martini.jpg",
        descr : "martini text",
        recipe : "martini recept",
        ingrs : [0, 1]
    },
    {
        id: 2,
        name : "Old Fashioned",
        img : "old-fashioned.jpg",
        descr : "old",
        recipe : "fashioned",
        ingrs : [1, 2]
    }
];

var dummyIngr = [
    {
        id : 0,
        name : "Amaretto",
        img : "amaretto.jpg",
        desc : "asdfas",
        have : true
    },
    {
        id : 1,
        name : "Jack Daniels",
        img : "jack-daniels.jpg",
        desc : "asfsdfdsasdfs",
        have : false
    },
    {
        id : 2,
        name : "Angostura Bitters",
        img : "angostura-bitter.jpg",
        desc : "xcvyxcv",
        have : false
    }
];

module.exports = function (app) {

    var objectRepository = {
        ingredientsModel: ingredientsModel,
        cocktails : dummyCocktails,
        ingredients : dummyIngr
    };


    /**
     * Edit the ingredient details
     */
    app.use('/ingredient/:ingredientid/edit',
        getIngredientsMW(objectRepository),
        updateIngredientsMW(objectRepository),
        renderMW(objectRepository, 'editingredient')
    );


    /**
     * Delete ingredient
     * - then redirect to /ingredients
     */
    app.use('/ingredients/:ingredientid/delete',
        getIngredientsMW(objectRepository),
        deleteIngredientsMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/ingredients');
        }
    );


    /**
     * Add new ingredient
     */
    app.use('/ingredient/:ingredientid/new',
        updateIngredientsMW(objectRepository),
        renderMW(objectRepository, 'editingredient')
    );


    /**
     * Show ingredient details
     */
    app.use('/ingredient/:ingredientid',
        getIngredientsMW(objectRepository),
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

