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

    describe('at()', function () {
        var friendwaresInstance;
        beforeEach(function () {
            friendwaresInstance = friendwares([
                { route: '', handle: function expressInit() {} },
                { route: '', handle: function compress() {} },
                { route: '', handle: function () {} }
            ]);
        });

        xit('should X', function () {
            true.should.be.false;
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
        var friendwaresInstance;
        beforeEach(function () {
            friendwaresInstance = friendwares([
                { route: '', handle: function expressInit() {} },
                { route: '', handle: function compress() {} },
                { route: '', handle: function () {} }
            ]);
        });


        xit('should X', function () {
            true.should.be.false;
        });
    });

});