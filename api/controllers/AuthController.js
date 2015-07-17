/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function(req, res){
    var fbAccessToken = req.body.fbAccessToken;
    sails.log("login attempted");
    sails.log(req.body);
    res.send({"name" : "test", "fbId" : 123021});
  }
};

