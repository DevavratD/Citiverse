const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;


const WEATHER_API_KEY = "5965b49e16c249a8b0362336252203";
const OPENWEATHER_API_KEY = "e91fc4ea7fb3389cef7287be7daf3ba4";

// Helper function to check if two numbers are within a given threshold
const isWithinThreshold = (value1, value2, threshold) => {
  return Math.abs(value1 - value2) <= threshold;
};

app.get('/weather/aggregated', async (req, res) => {
  try {
    // Default to Pune if no query parameters are provided
    const location = req.query.q || 'Pune';
    // Pune's coordinates (can be overridden via query parameters)
    const lat = req.query.lat || '18.516726';
    const lon = req.query.lon || '73.856255';

    // Construct the API URLs:
    // WeatherAPI (current weather)
    const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(location)}`;
    // OpenWeatherMap (current weather by latitude and longitude)
    const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    // Execute both requests concurrently
    const [weatherApiResponse, openWeatherResponse] = await Promise.all([
      axios.get(weatherApiUrl),
      axios.get(openWeatherUrl)
    ]);

    // Extract responses for convenience
    const wApi = weatherApiResponse.data;
    const owm = openWeatherResponse.data;

    // Build common data by averaging coordinates and extracting key parameters:
    const commonData = {
      location: {
        name: wApi.location.name,
        country: wApi.location.country,
        // Average coordinates from both responses
        lat: (wApi.location.lat + owm.coord.lat) / 2,
        lon: (wApi.location.lon + owm.coord.lon) / 2
      },
      temperature: {
        weatherAPI: wApi.current.temp_c,
        openWeatherMap: owm.main.temp
      },
      pressure: {
        weatherAPI: wApi.current.pressure_mb,
        openWeatherMap: owm.main.pressure
      },
      humidity: {
        weatherAPI: wApi.current.humidity,
        openWeatherMap: owm.main.humidity
      },
      condition: {
        weatherAPI: wApi.current.condition.text,
        openWeatherMap: owm.weather[0].description
      },
      wind: {
        // WeatherAPI provides wind in kph
        weatherAPI: wApi.current.wind_kph,
        // OpenWeatherMap returns wind speed in m/s, so convert to kph (m/s * 3.6)
        openWeatherMap: owm.wind.speed * 3.6
      }
    };

    // Define validation thresholds
    const tempThreshold = 3;       // degrees Celsius
    const pressureThreshold = 5;   // mb/hPa
    const humidityThreshold = 5;   // percentage
    // For wind, both values are now in kph
    const windThreshold = 2;       // kph

    // Validate each parameter
    const tempValid = isWithinThreshold(commonData.temperature.weatherAPI, commonData.temperature.openWeatherMap, tempThreshold);
    const pressureValid = isWithinThreshold(commonData.pressure.weatherAPI, commonData.pressure.openWeatherMap, pressureThreshold);
    const humidityValid = isWithinThreshold(commonData.humidity.weatherAPI, commonData.humidity.openWeatherMap, humidityThreshold);
    const windValid = isWithinThreshold(commonData.wind.weatherAPI, commonData.wind.openWeatherMap, windThreshold);
    
    // For condition, perform a simple case-insensitive check (e.g., both should mention "clear" or "sunny")
    const conditionAPI = commonData.condition.weatherAPI.toLowerCase();
    const conditionOWM = commonData.condition.openWeatherMap.toLowerCase();
    const conditionValid = (conditionAPI.includes("clear") || conditionAPI.includes("sunny")) &&
                           (conditionOWM.includes("clear") || conditionOWM.includes("sunny"));

    // Overall trust score: "high" if all validations pass; otherwise "low"
    const allValid = tempValid && pressureValid && humidityValid && windValid && conditionValid;
    const trustScore = allValid ? "high" : "low";

    // Build aggregated response object
    const aggregatedResponse = {
      common: commonData,
      validations: {
        temperature: tempValid,
        pressure: pressureValid,
        humidity: humidityValid,
        wind: windValid,
        condition: conditionValid
      },
      trustScore: trustScore,
      weatherAPI: wApi,
      openWeatherMap: owm
    };

    // Log common parameters and validation results to the console
    console.log("Common Data:");
    console.log(commonData);
    console.log("Validation Results:");
    console.log({
      temperature: tempValid,
      pressure: pressureValid,
      humidity: humidityValid,
      wind: windValid,
      condition: conditionValid
    });
    console.log("Overall Trust Score:", trustScore);

    // Return the aggregated response as JSON
    res.json(aggregatedResponse);

  } catch (error) {
    console.error('Error fetching aggregated weather data:', error.message);
    res.status(500).json({ error: 'Error fetching weather data.' });
  }
});

app.get('/aqi/aggregated', async (req, res) => {
    try {
      // Default to Pune if no query parameters are provided
      const location = req.query.q || 'Pune';
      // Pune's coordinates (can be overridden via query parameters)
      const lat = req.query.lat || '18.516726';
      const lon = req.query.lon || '73.856255';
      
      // Construct the API URLs:
      // WeatherAPI current endpoint with air quality data enabled (aqi=yes)
      const weatherAqiUrl = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;
      
      // OpenWeatherMap Air Pollution API URL (returns AQI data)
      const openWeatherAqiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
      
      // Execute both requests concurrently
      const [weatherAqiResponse, openWeatherAqiResponse] = await Promise.all([
        axios.get(weatherAqiUrl),
        axios.get(openWeatherAqiUrl)
      ]);
      
      // Extract AQI values:
      // WeatherAPI: using "us-epa-index" from the air_quality object
      const weatherData = weatherAqiResponse.data;
      const weatherAqiValue = weatherData.current.air_quality["us-epa-index"];
      
      // OpenWeatherMap: using the "aqi" value from the first element of the "list" array
      const openWeatherData = openWeatherAqiResponse.data;
      const openWeatherAqiValue = openWeatherData.list && openWeatherData.list.length > 0 
                                    ? openWeatherData.list[0].main.aqi 
                                    : null;
      
      // Define a threshold for AQI validation (difference ≤ 1)
      const aqiThreshold = 1;
      const aqiValid = isWithinThreshold(weatherAqiValue, openWeatherAqiValue, aqiThreshold);
      
      // Build the common aggregated AQI response data:
      const commonAqiData = {
        location: {
          name: weatherData.location.name,
          country: weatherData.location.country,
          // Average coordinates from WeatherAPI and the provided coordinates
          lat: (weatherData.location.lat + parseFloat(lat)) / 2,
          lon: (weatherData.location.lon + parseFloat(lon)) / 2
        },
        aqi: {
          weatherAPI: weatherAqiValue,
          openWeatherMap: openWeatherAqiValue
        },
        aqiValidation: aqiValid,
        trustScore: aqiValid ? "high" : "low"
      };
      
      // Log the common aggregated data
      console.log("Common Aggregated AQI Data:");
      console.log(commonAqiData);
      
      // Return only the common aggregated response
      res.json(commonAqiData);
      
    } catch (error) {
      console.error('Error fetching aggregated AQI data:', error.message);
      res.status(500).json({ error: 'Error fetching AQI data.' });
    }
});
  


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
