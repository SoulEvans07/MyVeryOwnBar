var assert = require('assert');
var describe = require("mocha").describe;
var expect = require('chai').expect;

describe('osszead', function () {
    it('should return 3 when a=1 and b=2', function () {
            var c = osszead(1, 2);
            expect(c).to.be.equal(3);
        });
});

function osszead(a, b) {
    return a+b;
}