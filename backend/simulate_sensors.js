// simulate_sensors.js
// Run this script with: node simulate_sensors.js
// It sends fake sensor data to the local backend every few seconds.

const http = require('http');

// Configuration
const BACKEND_HOST = 'localhost';
const BACKEND_PORT = 3000;
const DEVICE_ID = 'invernadero_simulado_1';

const sendData = () => {
    // Generate random plausible values
    const temperature = (20 + Math.random() * 10).toFixed(1); // 20.0 - 30.0
    const humidity = Math.floor(40 + Math.random() * 40);      // 40 - 80%
    const soil_moisture = Math.floor(300 + Math.random() * 400); // 300 - 700
    const light_level = Math.floor(200 + Math.random() * 800);   // 200 - 1000

    const postData = JSON.stringify({
        device_id: DEVICE_ID,
        temperature: parseFloat(temperature),
        humidity: humidity,
        soil_moisture: soil_moisture,
        light_level: light_level
    });

    const options = {
        hostname: BACKEND_HOST,
        port: BACKEND_PORT,
        path: '/api/arduino/data',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => { responseBody += chunk; });
        res.on('end', () => {
            console.log(`[Simulator] Sent: T=${temperature}°C H=${humidity}% -> Response: ${res.statusCode}`);
            try {
                const responseData = JSON.parse(responseBody);
                if (responseData.commands && responseData.commands.length > 0) {
                    console.log('🔔 [ACTUATOR] Received Commands:', JSON.stringify(responseData.commands, null, 2));
                }
            } catch (e) {
                // Ignore parse errors for non-JSON responses
            }
        });
    });

    req.on('error', (e) => {
        console.error(`[Simulator] Error: ${e.message}`);
        console.error(`Is the backend running on http://${BACKEND_HOST}:${BACKEND_PORT}?`);
    });

    // Write data to request body
    req.write(postData);
    req.end();
};

console.log('🌱 Starting Sensor Simulator...');
console.log(`📡 Sending data to http://${BACKEND_HOST}:${BACKEND_PORT}/api/arduino/data`);
console.log('Press Ctrl+C to stop.');

// Send data every 2.5 seconds
setInterval(sendData, 2500);

// Send one immediately
sendData();
