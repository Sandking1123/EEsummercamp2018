const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('./user/user.model');

var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.AUTH0_SIGNING_CERTIFICATE;
options.issuer = process.env.AUTH0_ISSUER;
options.audience = process.env.AUTH0_AUDIENCE;

passport.use(new JwtStrategy(options, ({sub, name}, done) => {
  User.findOrCreate({
    where: {id: sub},
    defaults: {
      id: sub,
      name
    }
  })
    .then(([user]) => {
      done(null, user);
    })
    .catch(err => done(err, false));
}));

module.exports = () => passport.authenticate('jwt', { session: false });
