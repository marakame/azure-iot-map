'use strict';

module.exports = function(socket) {

    var socket = socket;
    var EventHubClient = require('azure-event-hubs').Client;

    var connectionString = 'HostName={AppHostName};SharedAccessKeyName={YourSharedAccessKeyName};SharedAccessKey={YourSharedAccessKey}';

    var printError = function (err) {
      console.log(err.message);
    };

    var printMessage = function (message) {
      console.log('Message received: ');
      console.log(JSON.stringify(message.body));
      console.log('');

      // Send to client
      socket.emit('device-update', message.body);
    };

    var client = EventHubClient.fromConnectionString(connectionString);

    // Define listening function
    this.startListening = function() {
        client.open()
            .then(client.getPartitionIds.bind(client))
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
