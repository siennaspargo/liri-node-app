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
var callSpotify = function (songName) {
  if (songName === undefined) {
    songName = "hmmmmmmmmmm";
  }

  spotify.search({
      type: "track",
      query: songName,
      limit: 4
    },
    function (err, data) {
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

//  |||||||||||||||||||||||||| O M D B ||||||||||||||||||||||||||||||| //

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

var callMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

// Then run a request to the OMDB API with the movie specified
var urlRequest = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=fe69d00f";

// Make a request for a user with a given ID
axios.get(urlRequest)
  .then(function (response) {
    var movieData = response.data;

    console.log("Title: " + movieData.Title);
    console.log("Year: " + movieData.Year);
    console.log("Rated: " + movieData.Rated);
    console.log("IMDB Rating: " + movieData.imdbRating);
    console.log("Country: " + movieData.Country);
    console.log("Language: " + movieData.Language);
    console.log("Plot: " + movieData.Plot);
    console.log("Actors: " + movieData.Actors);
    console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
  })
};
 


//  |||||||||||||||||||||||||| Bands In Town ||||||||||||||||||||||||||||||| //


var callConcerts = function(concertShows) {
  return 
}










// ||||||||||||||||||||||| readfile fs |||||||||||||||||||||||||||
var readInput = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      request(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      request(dataArr[0]);
    }
  });
};


// ||||||||||||||||||||||| switch case to determin input in command line |||||||||||||||||||||||||||

// switch case to respond to whatever has been requested in the command line
var request = function (caseData, functionData) {
  switch (caseData) {
    case "concert-this":
      callConcerts(functionData);
      break;
    case "spotify-this-song":
      callSpotify(functionData);
      break;
    case "movie-this":
    callMovie(functionData);
      break;
    case "do-what-it-says":
      readInput();
      break;
    default:
      console.log("LIRI isn't bringing anything back for that.");
  }
};

// ||||||||||||||||||||||| take in command |||||||||||||||||||||||||||
// arguments
var runThis = function (argOne, argTwo) {
  request(argOne, argTwo);
};

runThis(process.argv[2], process.argv.slice(3).join(" "));