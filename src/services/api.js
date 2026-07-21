import axios from "axios";

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY || "13f23a58d3df706a6a1cf0c3c38ca67a";
const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

export const api = axios.create({
  baseURL: OPEN_WEATHER_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => ({
  ...config,
  params: {
    appid: OPEN_WEATHER_API_KEY,
    ...config.params,
  },
}));

const getOpenWeatherMessage = (error, city) => {
  const apiMessage = error?.response?.data?.message;

  if (apiMessage) {
    return apiMessage.charAt(0).toUpperCase() + apiMessage.slice(1);
  }

  if (error?.code === "ECONNABORTED") {
    return "The weather request timed out. Please try again.";
  }

  return `Unable to fetch weather data for "${city}".`;
};

export const getWeather = async (city) => {
  const query = city?.trim();

  if (!query) {
    throw new Error("Please enter a city name.");
  }

  try {
    const currentResponse = await api.get("/weather", {
      params: {
        q: query,
        units: "metric",
      },
    });

    const { lat, lon } = currentResponse.data?.coord || {};
    const canFetchAirQuality = Number.isFinite(lat) && Number.isFinite(lon);

    const [forecastResponse, airQualityResponse] = await Promise.all([
      api.get("/forecast", {
        params: {
          q: query,
          units: "metric",
          cnt: 12,
        },
      }),
      canFetchAirQuality
        ? api.get("/air_pollution", {
            params: {
              lat,
              lon,
            },
          })
        : Promise.resolve({ data: null }),
    ]);

    const airQualityIndex = airQualityResponse.data?.list?.[0]?.main?.aqi;

    return {
      ...currentResponse,
      data: {
        ...currentResponse.data,
        forecast: forecastResponse.data?.list || [],
        forecastDetails: forecastResponse.data,
        airQuality: airQualityIndex ?? "N/A",
        airQualityDetails: airQualityResponse.data,
      },
    };
  } catch (error) {
    throw new Error(getOpenWeatherMessage(error, query), { cause: error });
  }
};
