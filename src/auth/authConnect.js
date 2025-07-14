// src/auth/authConnect.js

module.exports = (validateUserFn) => {
  return async function (username, password, done) {
    try {
      const user = await validateUserFn(username, password);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };
};
