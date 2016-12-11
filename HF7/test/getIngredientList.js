// * WebStorm cant get over describe() and it() without this:
var mocha = require('mocha');
var expect = require('chai').expect;

var getIngredientListMW = require('../middlewares/ingredients/getIngredientList');

mocha.describe('#getIngredientList middleware', function () {

    mocha.it('should return ingredients in ascending order by name', function (done) {
        var req = {};
        var res = {
            tpl: {
                error: []
            }
        };

        var mongoList = [
            { name: 'amaretto' },
            { name: 'kahlua' },
            { name: 'jack daniels' }
        ];

        // * sorted by hand
        var sortedList = [
            { name: 'amaretto' },
            { name: 'jack daniels' },
            { name: 'kahlua' }
        ];

        var fakeIngredientModel = {
            find: function (some, cb) {
                cb(undefined, mongoList)
            }
        };

        getIngredientListMW({
            ingredientModel: fakeIngredientModel
        })(req, res, function (err) {
            expect(res.tpl.ingredients).to.eql(sortedList);
            expect(err).to.eql(undefined);
            done();
        });
    });

    mocha.it('should return error when db returns error', function (done) {
        var req = {};
        var res = {
            tpl: {
                error: []
            }
        };

        var fakeIngredientModel = {
            find: function (some, cb) {
                cb('mongodb error', undefined)
            }
        };

        getIngredientListMW({
            ingredientModel: fakeIngredientModel
        })(req, res, function (err) {
            // * 'cannot find ingredients' comes from my code
            expect(res.tpl.error).to.eql(['mongodb error', 'cannot find ingredients']);
            done();
        });
    })
});