console.log("welcome to liri bot.");

//  DEPENDENCIES ||||||||||||||||||||||||||||||||||||
require("dotenv").config();
//  Spotify 
var Spotify = require('node-spotify-api');
//  Spotify api keys
var keys = require('./keys');


// SPOTIFY |||||||||||||||||||||||||||||||||||||||||
// spotify search api / client id and secret id
var spotify = new Spotify(keys.spotify);

// // return artist name
// var returnArtist = function (artist) {
//   return artist.name;
// };

// return spotify info ( artist, tracks )
function callSpotify() {
  spotify.search({
    type: 'track',
    query: input,
    limit: 6
  }, function (err, data) {
    if (err) {
      return console.log(err);
    } else {
      //creating up a variable with all the info needed from spotify
      var artistName = "The artist is " + data.tracks.items[0].artists[0].name;
      var songName = "The song is " + data.tracks.items[0].name;
      var albumName = "In the album " + data.tracks.items[0].album.name;
      var previewUrl = "A Preview URL to this song is " + data.tracks.items[0].preview_url;

      //display the data in console.log
      var displayData = "\n" + artistName + "\n" + songName + "\n" + albumName + "\n" + previewUrl + "\n";
      console.log("\n" + displayData);

      //append info to the log.txt document
      fs.appendFile("log.txt", displayData, function (err) {
        if (err) {
          return console.log(err);
        }
      })
    }
  })
};


// OMDB

var request = require("request");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  //for the first word and the last word, don't add a plus
  if (i > 2 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  } else {

    movieName += nodeArgs[i];

  }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function (error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).Year);
  }
});

