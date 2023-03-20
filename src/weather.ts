import axios from "axios";

export const getWeatherData = async (
  apiKey: string,
  cityName: string,
  countryCode: string
) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&units=metric&appid=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

export const generateWeatherMessages = (
  minTemp: number,
  windSpeed: number,
  tempThreshold: number,
  windThreshold: number
) => {
  const tempMessage =
    minTemp < tempThreshold
      ? `⚠️ The temperature minimum for today is ${minTemp}°C, which is below the threshold of ${tempThreshold}°C.`
      : `🌡️ The temperature minimum for today is ${minTemp}°C.`;

  const windMessage =
    windSpeed > windThreshold
      ? `⚠️ The wind speed for today is ${windSpeed} m/s, which is above the threshold of ${windThreshold} m/s.`
      : `💨 The wind speed for today is ${windSpeed} m/s.`;

  return { tempMessage, windMessage };
};

export const getDataAndGenerateMessages = async (
  apiKey: string,
  cityName: string,
  countryCode: string,
  tempThreshold: number,
  windThreshold: number,
  
) => {

  const weatherData = await getWeatherData(apiKey, cityName, countryCode);
  const { tempMessage, windMessage } = generateWeatherMessages(
    weatherData.main.temp_min,
    weatherData.wind.speed,
    tempThreshold,
    windThreshold
  );
  return { tempMessage, windMessage };
};
