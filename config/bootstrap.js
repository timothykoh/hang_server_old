/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

function generateDummyData(){
    sails.log.info("Generating dummy data...");
    return Promise.all([
        User.create({
            name: "Nicky Ong",
            fbId: "654792264",
            email: "nickyongtest@gmail.com"
        }).then(function(userObj){
            sails.log.info("Created user\n", userObj);
            return Promise.all([
                Interest.create({name: "Raves", user: userObj.id}),
                Interest.create({name: "Soccer", user: userObj.id}),
                Interest.create({name: "Travel to Miami", user: userObj.id}),
                Interest.create({name: "Eat good food", user: userObj.id})
            ]);
        }),
        User.create({
            name: "Eddy Yeo",
            fbId: "100000390616771",
            email: "eddyyeotest@gmail.com"
        }).then(function(userObj){
            sails.log.info("Created user\n", userObj);
            return Promise.all([
                Interest.create({name: "Raves", user: userObj.id}),
                Interest.create({name: "Soccer", user: userObj.id}),
                Interest.create({name: "Travel to LA", user: userObj.id}),
                Interest.create({name: "Explore nyc", user: userObj.id})
            ]);
        }),
        User.create({
            name: "Lily Kwan",
            fbId: "1243112159",
            email: "lilykwantest@gmail.com"
        }).then(function(userObj){
            sails.log.info("Created user\n", userObj);
            return Promise.all([
                Interest.create({name: "Raves", user: userObj.id}),
                Interest.create({name: "Soccer", user: userObj.id}),
                Interest.create({name: "Eating", user: userObj.id}),
                Interest.create({name: "Sleeping", user: userObj.id})
            ]);
        })
    ]).then(function(results){
        sails.log.info("Created interests\n", results);
    });
}

module.exports.bootstrap = function(cb) {
    // generateDummyData().then(cb)

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
};
