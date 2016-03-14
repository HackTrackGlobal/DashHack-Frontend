/*
 * Get the modules
 */
var express = require('express');
var path = require('path');
var app  = express();

// Using the static files in the './public' folder
app.use(express.static(__dirname + '/public'));

// Catch'em all
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(3000, function() {
    console.log("Check out port 3000");
});