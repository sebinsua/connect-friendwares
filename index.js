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

    this.getMiddlewareNames = function () {
        return appOwnedMiddlewareStack.map(function (middleware) {
            return middleware.handle.name || 'anonymous';
        });
    };

    this.at = function (middlewareName) {
        var appOwnedMiddlewareNames = this.getMiddlewareNames();

        return this._at(appOwnedMiddlewareNames, middlewareName);
    };

    // @todo: what routes are on the middlewares?

    this.has = function (middlewareNamesToCheck) {
        if (!middlewareNamesToCheck) {
            return false;
        }

        var appOwnedMiddlewareNames = this.getMiddlewareNames();
        middlewareNamesToCheck = !isArray(middlewareNamesToCheck) ? [middlewareNamesToCheck] : middlewareNamesToCheck;
        
        return this._has(appOwnedMiddlewareNames, middlewareNamesToCheck);
    };

    this.hasBeforeCurrent = function (middlewareNamesToCheck, currentMiddlewareFunction) {
        if (!middlewareNamesToCheck) {
            return false;
        }

        var appOwnedMiddlewareNames = this.getMiddlewareNames(),
            currentMiddlewareName = currentMiddlewareFunction.name || 'anonymous',
            currentMiddlewareFoundAtIndex = this._at(appOwnedMiddlewareNames, currentMiddlewareName);

        var middlewareNamesBeforeCurrentMiddleware = appOwnedMiddlewareNames.slice(0, currentMiddlewareFoundAtIndex);

        return this._has(middlewareNamesBeforeCurrentMiddleware, middlewareNamesToCheck);
    };

    this._at = function (appOwnedMiddlewareNames, middlewareName) {
        return appOwnedMiddlewareNames.indexOf(middlewareName);
    };

    this._has = function (internalMiddlewareNames, middlewareNamesToCheck) {
        var allExist = true, i;
        for (i = 0; i < middlewareNamesToCheck.length; i++) {
            allExist = allExist && internalMiddlewareNames.indexOf(middlewareNamesToCheck[i]) !== -1;
        }
        return allExist;
    };

    return this;
}).bind({});