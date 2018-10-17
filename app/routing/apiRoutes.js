const friendsData = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData)
  });

  app.post("/api/friends", function(req, res) {
    const newFriend = req.body;

    const userScore = newFriend.scores;

    let match = {};
    let totalDiffNum = 50;

    


    for (let i = 0; i < friendsData.length; i++) {
      const potentialFriendScore = friendsData[i].scores;
      const scoreDiffArr = [];
      
      for (let x = 0; x < userScore.length; x++) {
        let scoreDiff = Math.abs(userScore[x] - potentialFriendScore[x]);
        scoreDiffArr.push(scoreDiff);
      }; 


      // add all the scoreDiffArr elements together for total Difference
      const sum = scoreDiffArr.reduce((a, b) => a + b, 0);

      if (sum < totalDiffNum) {
        totalDiffNum = sum;
        match = friendsData[i];
      }

    }

    friendsData.push(newFriend);

    res.json(match);
  });


};