console.log("welcome to liri bot, man.");

require("dotenv").config();

var spotify = new Spotify(keys.spotify);

spotify - this - song


//  Spotify npm dependency
var Spotify = require('node-spotify-api');
// api keys
var keys = require('keys');

var spotify = new Spotify({
  id: SPOTIFY_ID,
  secret: SPOTIFY_SECRET
});



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
      var artistName = "The Artist Name is " + data.tracks.items[0].artists[0].name;
      var songName = "The Song Name is " + data.tracks.items[0].name;
      var albumName = "This Song is in the Album " + data.tracks.items[0].album.name;
      var previewUrl = "The Preview URL to this song is " + data.tracks.items[0].preview_url;
      //display the data in console.log
      var displayData = "\n" + artistName + "\n" + songName + "\n" + albumName + "\n" + previewUrl + "\n";
      console.log("\n" + displayData);
      //appending to the log.txt document
      fs.appendFile("log.txt", displayData, function (err) {
        if (err) {
          return console.log(err);
        }
      })
    }
  })
};

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

  }

  else {

    movieName += nodeArgs[i];

  }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).Year);
  }
});