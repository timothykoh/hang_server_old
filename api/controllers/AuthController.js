/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function(req, res){
        var FB = require('fb');

        var fbAccessToken = req.body.fbAccessToken;
        FB.setAccessToken(fbAccessToken);
        FB.api('/me', {fields : ['id', 'name', 'email']}, function (result) {
            if(!result || result.error) {
                sails.log.error(!result ? 'error occurred' : result.error);
                return;
            }

            UserService.getUserByFbId(result.id).then(function(user){
                if (user == undefined){
                    // if user doesn't exist, create it
                    return User.create({
                        "name" : result.name,
                        "fbId" : result.id,
                        "email" : result.email
                    });
                } else{
                    return user;
                }
            }).then(function(user){
                // we will definitely have the user object by here
                // either it was in the db or we just created it
                req.session.user = user;
                req.session.fbAccessToken = fbAccessToken;
                res.send(user);
            });
        });
    },

    logout: function(req, res){
        req.session.destroy();
        res.send({ success : "Sucessfully logged out"});
    }
};