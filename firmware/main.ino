/*
  AgroSmart Firmware - Keyestudio KS0085 Smart Home Kit
  Reads sensors and sends data via Serial to Node.js Backend.
  
  Sensors Pinout (Standard KS0085 Shield):
  - DHT11 (Temp/Hum): Pin 4
  - Light Sensor:     Pin A1
  - Soil Moisture:    Pin A2
  
  Libraries Required (Install via Sketch -> Include Library -> Manage Libraries):
  - "DHT sensor library" by Adafruit
  - "Adafruit Unified Sensor"
*/

#include "DHT.h"

// --- CONFIGURATION ---
#define DHTPIN 4      // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11
#define PIN_LIGHT A1  // Analog pin for Light Sensor
#define PIN_SOIL A2   // Analog pin for Soil Moisture Sensor

// Device ID (identifier for the database)
String DEVICE_ID = "invernadero_1";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600); // Initialize Serial Communication
  dht.begin();
  
  // Wait a bit for serial to stabilize
  delay(1000);
}

void loop() {
  // 1. Read Sensors
  // Reading temperature or humidity takes about 250 milliseconds!
  float h = dht.readHumidity();
  float t = dht.readTemperature(); // Celcius
  
  // Read Analog Sensors (0-1023)
  int lightValue = analogRead(PIN_LIGHT);
  int soilValue = analogRead(PIN_SOIL);
  
  // Map analog values to percentage (0-100) if needed.
  // For now, sending raw values is fine, or we can map them.
  // Light: 0 (Dark) - 1023 (Bright) aprox
  // Soil: 0 (Dry) - 1023 (Wet) (Logic might be inverted depending on sensor, we'll calibrate later)
  
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    // Serial.println("Failed to read from DHT sensor!"); // Don't send error text to backend json parser
    return;
  }

  // 2. Format as JSON String manually
  // Example: {"device_id": "inv_1", "temperature": 24.5, "humidity": 60, "light_level": 500, "soil_moisture": 300}
  String json = "{";
  json += "\"device_id\": \"" + DEVICE_ID + "\",";
  json += "\"temperature\": " + String(t) + ",";
  json += "\"humidity\": " + String(h) + ",";
  json += "\"light_level\": " + String(lightValue) + ",";
  json += "\"soil_moisture\": " + String(soilValue);
  json += "}";

  // 3. Send via Serial (USB)
  Serial.println(json);

  // 4. Wait 2 seconds before next read
  delay(2000);
}
