/**
 * InterestController
 *
 * @description :: Server-side logic for managing interests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req, res){
        sails.log("hey");
        res.send("jhe");
    }
};