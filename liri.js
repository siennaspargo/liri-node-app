console.log("Developer: Sienna Spargo")
console.log("LIRI BOT")
console.log("A command line app.")
console.log("Concert? Song look up? Movie look up? Something random?")
console.log("ASK ME FOR concert-this or spotify-this-song or movie-this or do-what-it-says.")

//  DEPENDENCIES ||||||||||||||||||||||||||||||||||||
require("dotenv").config()
//  Spotify 
var Spotify = require("node-spotify-api")
//  Spotify api keys
var keys = require('./keys')
// FS for read/write.
var fs = require("fs")

//  |||||||||||||||||||||||||| Spotify ||||||||||||||||||||||||||||||| //
// spotify search api / client id and secret id
var spotify = new Spotify(keys.spotify)


var artistName = function(artist) {
  return artist.name
}

// return spotify info ( artist, tracks )
var callSpotify = function (songName) {
  if (songName === undefined) {
    songName = "'The Sign', by Ace of Base"
  }
  spotify.search({
      type: "track",
      query: songName,
      limit: 4
    },
    function (err, data) {
      if (err) {
        return console.log(err)
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i)
        console.log("artist: " + songs[i].artists.map(artistName))
        console.log("song: " + songs[i].name)
        console.log("preview song url: " + songs[i].preview_url)
        console.log("album: " + songs[i].album.name)
        console.log("||||||||||||||||||||||||||||||")
      }
    }
  );
};


//  |||||||||||||||||||||||||| Bands In Town ||||||||||||||||||||||||||||||| //
var callConcerts = function (artist) {
  var moment = require("moment")
  var request = require("request")

  var requestUrl = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")

  request(requestUrl, function (error, response, body) {
    //if no errors and stats code is 200
    if (!error && response.statusCode === 200) {

      var data = JSON.parse(body)

      for (var i = 0; i < 6; i++) {
        var date = "Concert Date: " + moment(data[i].datetime).format('MM/DD/YYYY')
        var venue = "Venue #: " + i + " "
        var name = "@: " + data[i].venue.name+ " "
        var lineUp = "Concert lineup: " + data[i].lineup+ " "
        var location = "Location: " + data[i].venue.city + ", " + data[i].venue.country+ " "

        // console result
        console.log(venue + name + lineUp + location + date)

      }
    }
  })
};

//  |||||||||||||||||||||||||| O M D B ||||||||||||||||||||||||||||||| //

// request npm package
var request = require("request")
// axios npm package
var axios = require("axios")
// moviename function
var callMovie = function (movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody"
    console.log(movieName)
  }

  // Then run a request to the OMDB API with the movie specified
  var urlRequest = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=fe69d00f";

  // Make a request for a user with a given ID
  axios.get(urlRequest)
    .then(function (response) {
      var movieData = response.data

      console.log("Title: " + movieData.Title)
      console.log("Year: " + movieData.Year)
      console.log("Rated: " + movieData.Rated)
      console.log("IMDB Rating: " + movieData.imdbRating)
      console.log("Country: " + movieData.Country)
      console.log("Language: " + movieData.Language)
      console.log("Plot: " + movieData.Plot)
      console.log("Actors: " + movieData.Actors)
      console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value)
    })
};

// ||||||||||||||||||||||| append fs |||||||||||||||||||||||||||
// push to log.txt
function log(results) {
  fs.appendFile("log.txt", "utf8", function (err, data) {
      if (err) {
       console.log(err)
      }
    }
  )};

  
// ||||||||||||||||||||||| writefile fs |||||||||||||||||||||||||||
var writeInput = function () {
  fs.writeFile("random.txt", "utf8", function (err, data) {
    console.log(data);

    var datArr = data.split(",");

    if (dataArr.length === 2) {
      request(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      request(dataArr[0]);
    }
  })
};


// ||||||||||||||||||||||| readfile fs |||||||||||||||||||||||||||
var readInput = function () {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err){
      console.log(err)
    }

    // var dataArr = data.split(",")
    // songName(dataArr[1])
  })
};


// ||||||||||||||||||||||| switch case to determin input in command line |||||||||||||||||||||||||||
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
}

// ||||||||||||||||||||||| take in command |||||||||||||||||||||||||||
// arguments
var runThis = function (argOne, argTwo) {
  request(argOne, argTwo);
}

runThis(process.argv[2], process.argv.slice(3).join(" "));