const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const vehicleData = {
  speed: 60,
  soc: 80,
  gps: { lat: 52.08940124511719, lng: 5.105764865875244 },
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  const sendVehicleData = () => {
    vehicleData.gps.lat += (Math.random() - 0.5) * 0.001; // Update lat
    vehicleData.gps.lng += (Math.random() - 0.5) * 0.001; // Update lng
    ws.send(JSON.stringify(vehicleData));
  };

  const interval = setInterval(sendVehicleData, 1000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
  console.log('Broadcasting...');
  console.log('HTTP server listening on port 3000');
});
