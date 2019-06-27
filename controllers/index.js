const EnforcerMiddleware = require("openapi-enforcer-middleware");
const enforcer = EnforcerMiddleware("./specification.yaml");
const models = require("../models");

module.exports = {
  middleware: [
    enforcer.middleware(),
    models.errorHandlerMiddleware,
    // this error handler middleware adjusts err.statusCode and err.message in the case when enforcer.middleware encounters an undefined operation (ie this means the operation does not exist)
    (err, req, res, next) => {
      if (err.message === "Cannot read property 'operation' of undefined") {
        err.statusCode = 404;
        err.message = "Operation does not exist";
      }
      next(err);
    }
  ],
  startup: async () => {
    await enforcer.promise;
    await enforcer.controllers("./controllers");
    await models.startup();
  }
};
