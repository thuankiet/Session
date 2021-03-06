const Session = require("../models/session.model");

module.exports = async (request, response, next) => {
  if (!request.signedCookies.sessionId) {
    var session = new Session();

    response.cookie("sessionId", session._id, {
      signed: true,
    });
    try {
      session = await session.save();
    } catch (e) {
      next(e);
    }
  }
  response.locals.session = session;
  next();
};
