// * WebStorm cant get over describe() and it() without this:
var mocha = require('mocha');
var expect = require('chai').expect;

var getCocktail = require('../middlewares/cocktails/getCocktail');

mocha.describe('#getCocktail middleware', function () {

    mocha.it('should return error when the ID in the url is invalid', function (done) {
        var req = {
            params:{
                cocktailid: 'wrongID'
            }
        };
        var res = {
            tpl: {
                error: []
            }
        };

        getCocktail({
            cocktailModel: {}
        }, false)(req, res, function (err) {
            // * there are 1 more thing in tpl.error but that comes from the ObjectId parse, so I have no control over that message.
            expect(res.tpl.error[0]).to.eql('invalid cocktail id: wrongID');
            done();
        });
    });

    mocha.it('should return error when there are no cocktail with that ID', function (done) {
        var req = {
            params:{
                cocktailid: '5827a14265a30d27880313c7'
            }
        };
        var res = {
            tpl: {
                error: []
            }
        };

        var fakeCocktailModel = {
            findOne: function (filter) { return {
                populate: function(field){ return {
                    exec: function (cb) { cb(null, undefined);
                            }
                        }
                    }
                }
            }
        };

        getCocktail({
            cocktailModel: fakeCocktailModel
        }, false)(req, res, function (err) {
            expect(res.tpl.error).to.eql([
                'no cocktail on id: \"5827a14265a30d27880313c7\"'
            ]);
            done();
        });
    });

    // * unexpected means that other than no cocktail on id
    mocha.it('should return error when db returns unexpected error', function (done) {
        var req = {
            params:{
                cocktailid: '5827a14265a30d27880313c7'
            }
        };
        var res = {
            tpl: {
                error: []
            }
        };

        var fakeCocktailModel = {
            findOne: function (filter) { return {
                populate: function(field){ return {
                    exec: function (cb) { cb('unexpected mongodb error', undefined);
                            }
                        }
                    }
                }
            }
        };

        getCocktail({
            cocktailModel: fakeCocktailModel
        }, false)(req, res, function (err) {
            expect(res.tpl.error).to.eql(['\"unexpected mongodb error\"']);
            done();
        })
    });

    mocha.it('should return the cocktail and set the title in edit mode', function (done) {
        var req = {
            params:{
                cocktailid: '5827a14265a30d27880313c6'
            }
        };
        var res = {
            tpl: {
                error: []
            }
        };

        var fakeCocktail = {
            id      : '5827a14265a30d27880313c6',
            name    : 'B-52',
            descr   : 'descr',
            recipe  : "dummyRecipe",
            img     : 'url',
            ingrs   : []
        };

        var fakeCocktailModel = {
            findOne: function (filter) { return {
                populate: function(field){ return {
                    exec: function (cb) { cb(undefined, fakeCocktail);
                            }
                        }
                    }
                }
            }
        };


        getCocktail({
            cocktailModel: fakeCocktailModel
        }, true)(req, res, function (err) {
            expect(res.tpl.cocktail).to.eql({
                id      : '5827a14265a30d27880313c6',
                name    : 'B-52',
                descr   : 'descr',
                recipe  : "dummyRecipe",
                img     : 'url',
                ingrs   : []
            });
            expect(res.tpl.title).to.eql('B-52' + ' - Edit');
            done();
        });
    });

    mocha.it('should return the cocktail and set the title in cocktail mode', function (done) {
        var req = {
            params:{
                cocktailid: '5827a14265a30d27880313c6'
            }
        };
        var res = {
            tpl: {
                error: []
            }
        };

        var fakeCocktail = {
            id      : '5827a14265a30d27880313c6',
            name    : 'B-52',
            descr   : 'descr',
            recipe  : "dummyRecipe",
            img     : 'url',
            ingrs   : []
        };

        var fakeCocktailModel = {
            findOne: function (filter) { return {
                populate: function(field){ return {
                    exec: function (cb) { cb(undefined, fakeCocktail);
                    }
                }
                }
            }
            }
        };


        getCocktail({
            cocktailModel: fakeCocktailModel
        }, false)(req, res, function (err) {
            expect(res.tpl.cocktail).to.eql({
                id      : '5827a14265a30d27880313c6',
                name    : 'B-52',
                descr   : 'descr',
                recipe  : "dummyRecipe",
                img     : 'url',
                ingrs   : []
            });
            expect(res.tpl.title).to.eql('B-52' + ' - Cocktail');
            done();
        });
    });
});