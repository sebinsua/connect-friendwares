"use strict";

var friendwares = require('..'),
    should = require('chai').should();

describe('friendwares', function () {
    describe('constructor', function () {
        it('should error if null is passed in', function () {
            (function () {
                friendwares(null);
            }).should.throw(Error, "friendware should be instantiated with a middleware stack.");
        });

        it('should be instantiable with a stack', function () {
            var instance;
            (function () {
                instance = friendwares([]);
            }).should.not.throw();
        });
    
        it('should be instantiable with an object that holds a stack', function () {
            var instance;
            (function () {
                instance = friendwares({ stack: [] });
            }).should.not.throw();
        });
    });

    describe('getMiddlewareNames()', function () {
        var friendwaresInstance;
        beforeEach(function () {
            friendwaresInstance = friendwares([
                { route: '', handle: function expressInit() {} },
                { route: '', handle: function compress() {} },
                { route: '', handle: function () {} }
            ]);
        });

        it('should return a list of names', function () {
            friendwaresInstance.getMiddlewareNames().should.eql(['expressInit', 'compress', 'anonymous']);
        });
    });

    describe('index()', function () {
        var friendwaresInstance;
        beforeEach(function () {
            friendwaresInstance = friendwares([
                { route: '', handle: function expressInit() {} },
                { route: '', handle: function compress() {} },
                { route: '', handle: function () {} }
            ]);
        });

        it('should return false if the route cannot be found', function () {
            var index = friendwaresInstance.index('failfail');
            index.should.be.false;
        });

        it('should return correct index if the route can be found', function () {
            var index = friendwaresInstance.index('compress');
            index.should.equal(1);
        });
    });

    describe('has()', function () {
        var friendwaresInstance;
        beforeEach(function () {
            friendwaresInstance = friendwares([
                { route: '', handle: function expressInit() {} },
                { route: '', handle: function compress() {} },
                { route: '', handle: function () {} }
            ]);
        });
        
        it('should contain a middleware which it contains', function () {
            friendwaresInstance.has('expressInit').should.be.true;
        });

        it('should not contain a middleware it does not contain', function () {
            friendwaresInstance.has('auntSuzy').should.be.false;
        });

        it('should be able to test for a list of *ALL* middlewares successfully', function () {
            friendwaresInstance.has(['expressInit', 'compress']).should.be.true;
        });

        it('should be able to test for a list of *ALL* middlewares unsuccessfully', function () {
            friendwaresInstance.has(['expressInit', 'auntSuzy']).should.be.false;
        });
    });

    describe('hasBeforeCurrent()', function () {
        var friendwaresInstance,
            middlewares = [
                { route: '', handle: function query() {} },
                { route: '', handle: function expressInit() {} },
                { route: '', handle: function compress() {} },
                { route: '', handle: function () {} }
            ];
        beforeEach(function () {
            friendwaresInstance = friendwares(middlewares);
        });

        it('should be able to test for a middleware that exists before a middleware function', function () {
            friendwaresInstance.hasBeforeCurrent('query', middlewares[2].handle).should.be.true;
        });

        it('should be able to test for a middleware does not exist before a middleware function', function () {
            friendwaresInstance.hasBeforeCurrent('compress', middlewares[0].handle).should.be.false;
        });

        it('should be able to test for middlewares that does not exist before a middleware function', function () {
            friendwaresInstance.hasBeforeCurrent(['query', 'compress'], middlewares[1].handle).should.be.false;
        });

        it('should throw an exception if you try to test for middlewares before a function which does not belong to the middleware stack', function () {
            (function () {
                friendwaresInstance.hasBeforeCurrent(['completelyBeyondThePoint'], function thisDoesNotExistInThatStackFool() {});
            }).should.throw(Error, "The current middleware does not belong to the middleware stack you are testing.");
        });
    });

});