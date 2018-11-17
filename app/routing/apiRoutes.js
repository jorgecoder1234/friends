var friendObject = require('../data/friends.js');


//Exports get and post method
module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friendObject);
    });




    app.post('/api/friends', function (req, res) {

        var Scores = req.body.scores; //Take the score array for the new Friend



        var scoresArray = []; //To store the values from comparing friends object against new Friend
        //var friendCount = 0;
        var yourMatch = 0; //This variable holds the index for the match to chose te best match in the object Friend


        //For loop for comparing the Current Object Friends against the new Friend
        for (var i = 0; i < friendObject.length; i++) {
            var Diff = 0;
            for (var j = 0; j < Scores.length; j++) {
                Diff += (Math.abs(parseInt(friendObject[i].scores[j]) - parseInt(Scores[j])));
            }
            scoresArray.push(Diff);
        }

        //Iterate the scorerray to find the index of teh best match 

        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[yourMatch]) {
                yourMatch = i;
            }

        }

        var bestFriend = friendObject[yourMatch];

        //Push the best friend selected as response of the POST
        res.json(bestFriend);

        //Add the new element to the NewFriend Object
        friendObject.push(req.body);
    });
};