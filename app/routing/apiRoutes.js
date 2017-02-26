var peopleData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(peopleData);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the peopleData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    var user = req.body;
    var bestMatch;
    var leastDiff;
    var currentDiff;

    for (var i = 0; i < peopleData.length; i++) {
      currentDiff = 0;
      for (var j = 0; j < peopleData[i].scores.length; j++) {
        currentDiff += Math.abs(parseInt(user.scores[j]) - parseInt(peopleData[i].scores[j]));

      }
      console.log("i " + i);
      console.log("currentDiff " + currentDiff);
      console.log("leastDiff " + leastDiff);
      console.log("-----------------------");
      if (i === 0) {
        bestMatch = 0;
        leastDiff = currentDiff;
      } else {
        if (currentDiff < leastDiff) {
          bestMatch = i;
          leastDiff = currentDiff;
        }
      }
    }

    peopleData.push(user);

    res.send(peopleData[bestMatch]);
    //display best match///////
    console.log("best Match is " +peopleData[bestMatch].name);

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    peopleData = [];


    console.log(peopleData);
  });
};
