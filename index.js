var isArray = function (value) { return Object.prototype.toString.call(value) === '[object Array]'; };

exports = module.exports = (function (appOrStack) {
    
    var appOwnedMiddlewareStack;
    if (isArray(appOrStack)) {
        appOwnedMiddlewareStack = appOrStack;
    } else if (appOrStack && appOrStack.stack) {
        appOwnedMiddlewareStack = appOrStack.stack;
    } else {
        throw new Error("friendware should be instantiated with a middleware stack.");
    }

    // @todo: could we think about the routes on the middlewares; perhaps create some kind of query chain interface.

    this.getMiddlewareNames = function () {
        return appOwnedMiddlewareStack.map(function (middleware) {
            return middleware.handle.name || 'anonymous';
        });
    };

    this.index = function (middlewareName) {
        var appOwnedMiddlewareNames = this.getMiddlewareNames();

        return this._index(appOwnedMiddlewareNames, middlewareName);
    };

    this.has = function (middlewareNamesToCheck) {
        if (!middlewareNamesToCheck) {
            return false;
        }

        var appOwnedMiddlewareNames = this.getMiddlewareNames();
                
        return this._has(appOwnedMiddlewareNames, middlewareNamesToCheck);
    };

    this.hasBeforeCurrent = function (middlewareNamesToCheck, currentMiddlewareFunction) {
        if (!middlewareNamesToCheck) {
            return false;
        }

        var appOwnedMiddlewareNames = this.getMiddlewareNames(),
            currentMiddlewareName = currentMiddlewareFunction.name || 'anonymous',
            currentMiddlewareFoundAtIndex = this._index(appOwnedMiddlewareNames, currentMiddlewareName);
        if (currentMiddlewareFoundAtIndex === false) {
            throw new Error("The current middleware does not belong to the middleware stack you are testing.");
        }

        var middlewareNamesBeforeCurrentMiddleware = appOwnedMiddlewareNames.slice(0, currentMiddlewareFoundAtIndex);

        return this._has(middlewareNamesBeforeCurrentMiddleware, middlewareNamesToCheck);
    };

    this._index = function (appOwnedMiddlewareNames, middlewareName) {
        var index = appOwnedMiddlewareNames.indexOf(middlewareName);
        return index !== -1 ? index : false;
    };

    this._has = function (internalMiddlewareNames, middlewareNamesToCheck) {
        middlewareNamesToCheck = !isArray(middlewareNamesToCheck) ? [middlewareNamesToCheck] : middlewareNamesToCheck;

        var allExist = true, i;
        for (i = 0; i < middlewareNamesToCheck.length; i++) {
            allExist = allExist && internalMiddlewareNames.indexOf(middlewareNamesToCheck[i]) !== -1;
        }
        return allExist;
    };

    return this;
}).bind({});