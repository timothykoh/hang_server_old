/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function(req, res){
        sails.log("Logging in...")
        var FB = require('fb');

        var fbAccessToken = req.body.fbAccessToken;
        sails.log("fbAccessToken", fbAccessToken);
        FB.setAccessToken(fbAccessToken);
        FB.api('/me', {fields : ['id', 'name', 'email']}, function (result) {
            if(!result || result.error) {
                sails.log.error(!result ? 'error occurred' : result.error);
                return;
            }

            UserService.getUserByFbId(result.id).then(function(user){
                if (user == undefined){
                    sails.log("User doesn't exist, create it");
                    // if user doesn't exist, create it
                    return User.create({
                        "name" : result.name,
                        "fbId" : result.id,
                        "email" : result.email
                    });
                } else{
                    sails.log("User exists");
                    return user;
                }
            }).then(function(user){
                // we will definitely have the user object by here
                // either it was in the db or we just created it
                req.session.user = user;
                req.session.fbAccessToken = fbAccessToken;
                req.session.authenticated = true;
                sails.log("Sending User obj", user);
                res.send(user);
            }).catch(function(err){
                sails.log.error(err);
                res.send({error: err});
            });
        });
    },

    logout: function(req, res){
        sails.log("Logging out...");
        req.session.destroy();
        sails.log("Logout success");
        res.send({success: "Sucessfully logged out"});
    }
};