const passport = require('passport');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const { getUserFromToken } = require('./cognito'); // Your Cognito token validator
if (process.env.NODE_ENV !== 'test') {
  require('./cognito'); // Only load Cognito in non-test environments
}
passport.use(
  'bearer',
  new BearerStrategy(async (token, done) => {
    try {
      const user = await getUserFromToken(token);
      return done(null, user);
    } catch (err) {
      return done(null, false);
    }
  })
);
