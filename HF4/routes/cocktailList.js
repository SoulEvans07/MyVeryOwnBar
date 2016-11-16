var renderMW = require('../middlewares/generic/render');

var getCocktailListMW = require('../middlewares/cocktails/getCocktailList');
var updateCocktailMW = require('../middlewares/cocktails/updateCocktail');
var getCocktailMW = require('../middlewares/cocktails/getCocktail');
var deleteCocktailMW = require('../middlewares/cocktails/deleteCocktail');

var cocktailModel = {};

var dummyCocktails = [
    {
        id: 0,
        name : "Manhattan",
        img : "manhattan.jpg",
        descr : "text",
        recipe : "recipeText",
        ingrs : [1, 3]
    },
    {
        id: 1,
        name : "Martini",
        img : "martini.jpg",
        descr : "martini text",
        recipe : "martini recept",
        ingrs : [1, 2]
    },
    {
        id: 2,
        name : "Old Fashioned",
        img : "old-fashioned.jpg",
        descr : "old",
        recipe : "fashioned",
        ingrs : [2, 3]
    }
];

var dummyIngr = [
    {
        id : 1,
        name : "Amaretto",
        img : "amaretto.jpg",
        desc : "asdfas",
        have : true
    },
    {
        id : 2,
        name : "Jack Daniels",
        img : "jack-daniels.jpg",
        desc : "asfsdfdsasdfs",
        have : false
    },
    {
        id : 3,
        name : "Angostura Bitters",
        img : "angostura-bitter.jpg",
        desc : "xcvyxcv",
        have : false
    }
];

module.exports = function (app) {

    var objectRepository = {
        cocktailModel: cocktailModel,
        cocktails : dummyCocktails,
        ingredients : dummyIngr
    };


    /**
     * Edit the cocktail details
     */
    app.use('/cocktail/:cocktailid/edit',
        getCocktailMW(objectRepository),
        updateCocktailMW(objectRepository),
        renderMW(objectRepository, 'editcocktail')
    );


    /**
     * Delete cocktail
     * - then redirect to /cocktails
     */
    app.use('/cocktail/:cocktailid/delete',
        getCocktailMW(objectRepository),
        deleteCocktailMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/cocktails');
        }
    );


    /**
     * Add new cocktail
     */
    app.use('/cocktail/:cocktailid/new',
        updateCocktailMW(objectRepository),
        renderMW(objectRepository, 'editcocktail')
    );


    /**
     * Show cocktail details
     */
    app.use('/cocktail/:cocktailid',
        getCocktailMW(objectRepository),
        renderMW(objectRepository, 'cocktail')
    );


    /**
     * List all cocktail
     */
    app.use('/cocktails',
        getCocktailListMW(objectRepository),
        renderMW(objectRepository, 'cocktails')
    );
};

