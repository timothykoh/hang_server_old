/**
 * InterestController
 *
 * @description :: Server-side logic for managing interests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res){
        sails.log("Creating interest...");
        var interest = {
            "name": req.body.name,
            "user": req.session.user.id
        };
        sails.log("Interest obj:", interest);
        Interest.create(interest).then(function(interest){
            sails.log("Interest created", interest);
            res.send(interest);
        }).catch(function(err){
            sails.log.error(err);
            res.send({error: err});
        });
    },

    getAllUserInterests: function(req, res){
        sails.log("Getting user interest for user", req.param("userId"), "...");
        Interest.find({"user": req.param("userId")}).then(function(interests){
            sails.log("Got all user interests", interests);
            res.send(interests);
        }).catch(function(err){
            sails.log.error(err);
            res.send({error: err});
        });
    },
    
    getSelfInterest: function(req, res){
        sails.log("Getting self interest...");
        Interest.find({"user": req.session.user.id, "id": req.param("interestId")})
        .then(function(interest){
            sails.log("Got self interest", interest);
            res.send(interest);
        }).catch(function(err){
            sails.log.error(err);
            res.send({error: err});
        });
    },

    getAllSelfInterests: function(req, res){
        sails.log("Getting all self interests...");
        Interest.find({"user": req.session.user.id}).then(function(interests){
            sails.log("Got all interests", interests);
            res.send(interests);
        }).catch(function(err){
            sails.log.error(err);
            res.send({error: err});
        });
    },

    deleteUserInterest: function(req, res){
        sails.log("Deleting interest...");
        Interest.destroy({
            "id": req.param("interestId"),
            "user": req.session.user.id
        }).then(function(deleted){
            sails.log("Interest deleted", deleted);
            res.send({success: "Interest deleted"});
        }).catch(function(err){
            if (err){
                sails.log.error(err);
                res.send({error: err});
            }
        });
    }
};

