const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('./user/user.model');

var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// public key used to verify token
options.secretOrKey = `-----BEGIN CERTIFICATE-----
MIIDCTCCAfGgAwIBAgIJJ5oV5gr/hI8fMA0GCSqGSIb3DQEBCwUAMCIxIDAeBgNVBAMTF25pa29sb3Zza2EuZXUuYXV0aDAuY29tMB4XDTE4MDgxNDE5NTkxOFoXDTMyMDQyMjE5NTkxOFowIjEgMB4GA1UEAxMXbmlrb2xvdnNrYS5ldS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCrFQmGfZLfBSZcyzuq3U8+8xRO/OyDAEPcKPn7lIlPfoVY+Id44LqBYrg9H0Uzs8c+kakmgC4RwVhLAY5YmzarKgjri1GxMEzTz2bHX4OiAfB+5cRznYCBC6RmgFKdtlnjPUf9Av+DtTAmcNZ655ALj40N4Dwe1BnsV7HQnGqilmILhyIRcWTzKOoKo8hdaPpYjwl0EtfQIoKofWxKcSDaFAGPdENCJzIhM5ZUoDZZTEY6ZEM9yXCu4cMQe/CiwMB7AXeiQfWSJuN128GIvfmBJo2dUbGRXxbfuvgp7OtkYfKQH5AMac1KoseukGSSy5iS8AQfKVMW71LxCJAT6t4tAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFE3Mb9FEfQblT3SQ9ZOseBLLkSh5MA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEAeu04+FpHlM0vdswt49fmgXs/DQj7LBHWXYYgBz4d/O9ydfCGTZuYMNGd9sXtsXgmdxS0sq96ph9/A3KFMHHj7jPbB9LBqNdoeA73E5yoUn5vhWtSgZtl+xlWIy9rgLjuS6e8dDpnur492eBWe3YediYU5wH7WsSnUyoTXa8bBehgku/OFQytqOitxO0nCnu5UFiwi63WBWkrIB5QQpBac/8v00CPfI2ujaoBKJg8MBI3q67r4pJXiAq3eHV2HSsbtA/eQ2prEC0MkK6//MORQzjs4IKSL2WqiOJkDNyXNBDd7oWIGUYi75Dnd8l03Tdd2hMdLJW/zRYz5lNmmVXsFA==
-----END CERTIFICATE-----
`;

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
