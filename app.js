var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');
var jquery = require('jquery');
var deviceReaderModule = require('./read-device-to-cloud-messages');

// Create express app
var app = express();
var server = require('http').Server(app);

// We will use socket.io for sending and receiving realtime data through websockets
var io = require('socket.io')(server);

// If running in Azure process.env.port will get the port assigned to the app
// If running locally the app will use a fixed port
var port = process.env.port || 3000

// Setup the app to use handlebars.js for templating
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Setup routes
app.get('/', function(req, res) {
    res.render('index');
});

app.use(express.static(__dirname + '/static'));

// Have the app listen on the port defined previously
server.listen(port);

// Start the websocket communications
io.on('connection', function (socket) {
	var deviceReader = new deviceReaderModule(socket);

	deviceReader.startListening();
});
