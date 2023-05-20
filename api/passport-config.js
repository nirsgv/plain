/* eslint-disable no-debugger */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
  console.log('authenticateUser');
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (!user) {
      return done(null, false, {message: 'No user with this email'})
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password Incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(new LocalStrategy({ usenameField: 'email', passwordField: 'password'}, authenticateUser ));
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    done(null, getUserById(id))
  })

}

module.exports = initialize;