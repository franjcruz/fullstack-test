import { ExtractJwt, Strategy } from 'passport-jwt';

import { getUser } from '../services/userService';
import logger from '../utils/logger';

// CLave de encriptación para JWT
const secret = process.env.JWT_ENCRYPTION;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  let opts = {};

  // El token viene en la cabecera como Bearer
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;

  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      return getUser({ _id: jwtPayload.id })
        .then(user => {
          if (user) {
            // Si existe usuario...
            done(null, user);
          } else {
            // Sino devuelve 401 Unauthorized
            done(null, false);
          }
        })
        .catch(err => {
          logger.info(err);
          done(null, false);
        });
    })
  );
};
