var express = require("express");
var router = express.Router();
var fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  var randNumbers = {};
  var requests = [];
  for (var i = 0; i < 50; i++) {
    var num = (Math.floor(Math.random() * 457653));
    while (randNumbers[num]) {
      num = (Math.floor(Math.random() * 457653));
    }
    randNumbers[num] = true;
    requests.push(`https://api.forismatic.com/api/1.0/?method=getQuote&key=${num}&lang=en&format=json`);
  }

  var promises = [];
  for (var i = 0; i < requests.length; i++) {
    promises.push(fetch(requests[i]).then(function(result){
      return result.json();
    }).catch(function(error) {
      console.log("Promise ERROR: ", error);
    }));
  }

  var allPromise = Promise.all(promises);

  allPromise.then(function(result) {
    res.status(200).send(result.filter((r) => r != null).slice(0, 20));
  }).catch(function(error) {
    console.log("ERROR: ", error);
  });
});

module.exports = router;
