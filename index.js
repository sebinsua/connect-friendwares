// See: https://github.com/visionmedia/express/blob/c3bd65eda2fd6abe9775d32da4944e802111de1a/lib/middleware.js#L20
// Possible use: req.app.stack
exports = module.exports = function getAllMiddlewares(middlewares) {
    return middlewares.map(function (middleware) { return middleware.handle.name; });
};