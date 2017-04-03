var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');
var jquery = require('jquery');
var deviceReaderModule = require('./read-device-to-cloud-messages');

var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

var port = process.env.port || 3000
//setup our app to use handlebars.js for templating
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
app.get('/', function(req, res) {
    res.render('index');
});

app.use(express.static(__dirname + '/static'));

//have our app listen on azure port local port 3000
server.listen(port);

io.on('connection', function (socket) {
	var deviceReader = new deviceReaderModule(socket);

	deviceReader.startListening();
});
