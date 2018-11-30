console.log("welcome to liri bot.");

//  DEPENDENCIES ||||||||||||||||||||||||||||||||||||
require("dotenv").config();
//  Spotify 
var Spotify = require("node-spotify-api");
//  Spotify api keys
var keys = require('./keys');
// axios npm
var axios = require("axios");
// moment.js
var moment = require("moment");
// FS package for read/write.
var fs = require("fs");



// SPOTIFY |||||||||||||||||||||||||||||||||||||||||
// spotify search api / client id and secret id
var spotify = new Spotify(keys.spotify);

// return artist name
var getArtistNames = function (artist) {
  return artist.name;
};

// return spotify info ( artist, tracks )
var callSpotify = function(songName) {
  if (songName === undefined) {
    songName = "hmmmmmmmmmm";
  }

  spotify.search(
    {
      type: "track",
      query: songName,
      limit: 4
    },
    function(err, data) {
      if (err) {
        return console.log(err);
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist: " + songs[i].artists.map(getArtistNames));
        console.log("song: " + songs[i].name);
        console.log("preview song url: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("||||||||||||||||||||||||||||||");
      }
    }
  );
};

// // OMDB

// var request = require("request");

// // Store all of the arguments in an array
// var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
// var movieName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {

//   //for the first word and the last word, don't add a plus
//   if (i > 2 && i < nodeArgs.length) {

//     movieName = movieName + "+" + nodeArgs[i];

//   } else {

//     movieName += nodeArgs[i];

//   }
// }

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// request(queryUrl, function (error, response, body) {

//   // If the request is successful
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("Release Year: " + JSON.parse(body).Year);
//   }
// });



var readInput = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      request(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      request(dataArr[0]);
    }
  });
};


// switch case to tend to whatever has been typed in the command line
var request = function(caseData, functionData) {
  switch (caseData) {
  case "concert-this":
    getMyBands(functionData);
    break;
  case "spotify-this-song":
    callSpotify(functionData);
    break;
  case "movie-this":
    getMeMovie(functionData);
    break;
  case "do-what-it-says":
    readInput();
    break;
  default:
    console.log("LIRI isn't bringing anything back for that.");
  }
};


// arguments
var runThis = function(argOne, argTwo) {
  request(argOne, argTwo);
};

runThis(process.argv[2], process.argv.slice(3).join(" "));
