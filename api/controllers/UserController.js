/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    me: function(req, res){
        if (req.session.user !== undefined){
            res.send(req.session.user);
        } else{
            res.send({ error : "Session doesn't contain user data" });
        }
    }
};

