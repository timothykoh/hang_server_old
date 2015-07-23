/**
 * SearchController
 *
 * @description :: Server-side logic for managing interests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
    users: function(req, res){
        var searchTerm = req.param("searchTerm");
        User.find({"name": {"contains": searchTerm}}).then(function(users){
            sails.log("Search users completed", users);
            res.send({"users": users});
        }).catch(function(err){
            sails.log.error(err);
            res.send({error: err});
        });
    },

    interests: function(req, res){
        var searchTerm = req.param("searchTerm");
        Interest.find({"name": {"contains": searchTerm}}).then(function(interests){
            sails.log("Search interests completed", interests);
            res.send({"interests": interests});
        }).catch(function(err){
            sails.log.error(err);
            res.send({error: err});
        });
    },

    all: function(req, res){
        var searchTerm = req.param("searchTerm");
        Promise.all([
            User.find({"name": {"contains": searchTerm}}),
            Interest.find({"name": {"contains": searchTerm}})
        ]).then(function(resultArr){
            var results = {
                "users": resultArr[0],
                "interests": resultArr[1]
            };
            sails.log("Search all complete", results);
            res.send(results);
        }).catch(function(err){
            sails.log.error(err);
            res.send({error: err});
        });
    }
};