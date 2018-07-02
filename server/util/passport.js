/**
 * Created by lakshmi on 15/02/18.
 */


var JwtStrategy     = require('passport-jwt').Strategy;
var ExtractJwt      = require('passport-jwt').ExtractJwt;
var path            = require('path');
var Models          = require("../models");
var constants       = require('./constants');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = constants.SERVER.JWT_SECRET_KEY;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
