var express = require('express');
var bodyParser = require('body-parser');
var logfmt = require('logfmt');


var connector = process.env.CONNECTOR || 'hipchat';
var service = require('./connectors/' + connector + '.js');
var bitbucketParser = require('./bitbucket-parser.js');


var app = express();
app.use(logfmt.requestLogger());
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("Set your repository's pull request POST hook to this page's URL.");
});

app.post('/', function(req, res) {
    var message = bitbucketParser.generateMessage(req.body);
    if (message !== undefined) { service.sendMessage(message); }
    res.send(200);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log('Listening on ' + port);
});
