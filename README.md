
# Azure IoT Map

This is a realtime map with data received from an Azure IoT Hub. This project is intended to work as a demo of IoT devices telemetry simulation in the cloud with Azure Web Apps and the Azure IoT Hub and will be presented during the 2017 Technology Conference of UTEG University in Guadalajara. This demo works together with the [Azure IoT Device Generator](https://github.com/marakame/azure-iot-device-generator) which works as the simulator of devices and sends data to the IoT Hub which is where this app listens to to get its data.

## Getting Started

This demo is based on the [Azure docs tutorial for simulating IoT devices with Node.js](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-getstarted), all you need to get started is generating an IoT Hub in Azure, clone the app locally and run it just changing the connection string with your own data as explained in the mentioned tutorial.

### Prerequisites

Having a working Azure IoT Hub , Node.js and the [IoT Device Generator app](https://github.com/marakame/azure-iot-device-generator) to get the simulated data.

### Installing

Just clone de project, install the required dependencies with:

```
mpm install
```

and run with:

```
node app.js
```
The app will be available at http://localhost:3000, The page will show a realtime heatmap with simulated temperature data obtained from the simulated devices created with the Device Generator app.

## Deployment in Azure

The app is ready to be deployed as an Azure web app, if you choose to do so, for the love of God, [use git to deploy your local code](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-deploy-local-git) or use github or Visual Studio but don't try to upload via FTP. It's Hell. You've been warned.

## Acknowledgments

* Ing. Sergio Hernández Hernández for the invitation to create this demo and the opportunity to share it in conference
