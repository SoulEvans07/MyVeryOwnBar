var requireOption = require('../generic/common').requireOption;

/**
 * Handle the ajax call from the client side checkbox on the ingredients page.
 */

module.exports = function (objectrepository) {

    var ingredientModel = requireOption(objectrepository, 'ingredientModel');

    return function (req, res) {
        var id = req.body.ingredient;
        var have = req.body.checked

        console.log("ajax call: body: " + JSON.stringify(req.body));

        res.tpl.ingredients[id].have = have;
        res.end();
    };

};