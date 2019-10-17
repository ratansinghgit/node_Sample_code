
var BCrypt = require('bcrypt');
import { User } from './src/models/user';
import { UserType } from './src/models/usertype';
var AuthServices = require('./src/services/authServices');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const Passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const Config = require('./config');

// require('./authstrategies/local.auth.strategy.js')(Passport);
//Serialization
Passport.serializeUser(function (user, done) {
  done(null, user.id);
});

Passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//Strategies
Passport.use(new LocalStrategy({ usernameField: 'username' }, function (username, password, done) {
  var phonenopattern = /^\d{10}$/;
  var emailpattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/i;;
  if (phonenopattern.test(username)) {
    var where = { contactno: username }
  } else if (emailpattern.test(username)) {
    var where = { email: username }
  } else {
    return done(null, false, { message: 'Invalid username.' });
  }
  User.findOne(where).populate('usertypeid').exec(function (err, user) {
    console.log("user=========="+user)
    var authInfo = user;
    if (err) { return done(null, false, { message: 'Invalid username.' }); }
    if (!user) {
      return done(null, false, { message: 'Invalid username.' });
    }
    if (!BCrypt.compareSync(password, authInfo.password)) {
      return done(null, false, { error: true, statusCode: 202 });
    } else {
      var data = {
        "_id": authInfo._id,
        "email": authInfo.email,
        "firstname": authInfo.firstname,
        "usertypeid": authInfo.usertypeid.typename,
        "username": authInfo.username,
        "middlename": authInfo.middlename,
        "dob": authInfo.dob,
        "lastname": authInfo.lastname,
        "contactno": authInfo.contactno,
        "profileImg": Config.url + "iotnode/uploads/" + authInfo.profileImg
      }
      return done(null, data);
    }
  });
}
));

Passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  function (jwtPayload, cb) {
    //find the user in db if needed
    User.findOne({ email: jwtPayload.data.email }, function (err, user) {
      if (err) {
        return cb(err, false, 1);
      }
      if (user) {
        return cb(null, user, 2);
      } else {
        return cb(null, false, 3);
        // or you could create a new account
      }
    });
  }
));

module.exports = Passport;
