'use strict';

module.exports = function(socket) {

    // Create the websocket and event hub client
    var socket = socket;
    var EventHubClient = require('azure-event-hubs').Client;

    // Event hub client connection string
    var connectionString = 'HostName={AppHostName};SharedAccessKeyName={YourSharedAccessKeyName};SharedAccessKey={YourSharedAccessKey}';

    // Function to print errors to the console
    var printError = function (err) {
      console.log(err.message);
    };

    // Function to print messages to the console and emit the corresponding
    // message to the map via websockets
    var printMessage = function (message) {
      console.log('Message received: ');
      console.log(JSON.stringify(message.body));
      console.log('');

      // Send to client
      socket.emit('device-update', message.body);
    };

    // Create the event hub client
    var client = EventHubClient.fromConnectionString(connectionString);

    // The startListening function will open an event hub client and start listening
    // for messages, when a message is received, the message will be emitted via
    // websockets to the web map
    this.startListening = function() {
        client.open()
            // Bind the client to the partitionIds of the Azure IoT Hub
            .then(client.getPartitionIds.bind(client))
            // Then create the receiver and the listened methods
            .then(function (partitionIds) {
                return partitionIds.map(function (partitionId) {
                    return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
                        console.log('Created partition receiver: ' + partitionId)
                        receiver.on('errorReceived', printError);
                        receiver.on('message', printMessage);
                    });
                });
            })
            .catch(printError);
    }
}
