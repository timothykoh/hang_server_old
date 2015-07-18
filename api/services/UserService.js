module.exports = {
    // returns user object if exists else returns undefined
    getUserByFbId: function(fbId){
        return User.find({"fbId" : fbId}).then(function(userArr){
            if (userArr.length == 0){
                return undefined;
            } else {
                return userArr[0];
            }
        });
    }
};