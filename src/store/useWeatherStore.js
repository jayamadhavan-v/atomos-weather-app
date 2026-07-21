import { create } from "zustand";
import { getWeather } from "../services/api";
import {
  cloudyTheme,
  fogTheme,
  nightTheme,
  rainyTheme,
  snowTheme,
  sunnyTheme,
  thunderTheme,
  windyTheme,
} from "../themes";

const kelvinToCelsius = (temperature) => {
  if (typeof temperature !== "number") return null;
  return temperature > 100 ? Math.round(temperature - 273.15) : Math.round(temperature);
};

const weatherIconMap = {
  Clear: "\u2600\uFE0F",
  Clouds: "\u2601\uFE0F",
  Rain: "\uD83C\uDF27\uFE0F",
  Drizzle: "\uD83C\uDF26\uFE0F",
  Thunderstorm: "\u26C8\uFE0F",
  Snow: "\u2744\uFE0F",
  Mist: "\uD83C\uDF2B\uFE0F",
  Fog: "\uD83C\uDF2B\uFE0F",
  Haze: "\uD83C\uDF2B\uFE0F",
  Smoke: "\uD83C\uDF2B\uFE0F",
  Dust: "\uD83C\uDF2B\uFE0F",
  Sand: "\uD83C\uDF2B\uFE0F",
  Ash: "\uD83C\uDF2B\uFE0F",
  Squall: "\uD83D\uDCA8",
  Tornado: "\uD83C\uDF2A\uFE0F",
};

const getThemeForWeather = ({
  condition = "",
  description = "",
  temperature,
  windSpeed,
  weatherId,
  iconCode = "",
} = {}) => {
  const normalizedCondition = `${condition} ${description}`.toLowerCase();
  const isNight = iconCode.endsWith("n");

  if (weatherId >= 200 && weatherId < 300) return thunderTheme;
  if (weatherId >= 300 && weatherId < 600) return rainyTheme;
  if (weatherId >= 600 && weatherId < 700) return snowTheme;
  if (weatherId >= 700 && weatherId < 800) return fogTheme;

  if (normalizedCondition.includes("thunder")) return thunderTheme;
  if (normalizedCondition.includes("rain") || normalizedCondition.includes("drizzle")) return rainyTheme;
  if (normalizedCondition.includes("snow") || normalizedCondition.includes("sleet")) return snowTheme;
  if (
    normalizedCondition.includes("mist") ||
    normalizedCondition.includes("fog") ||
    normalizedCondition.includes("haze") ||
    normalizedCondition.includes("smoke") ||
    normalizedCondition.includes("dust") ||
    normalizedCondition.includes("sand") ||
    normalizedCondition.includes("ash")
  ) {
    return fogTheme;
  }
  if (
    normalizedCondition.includes("squall") ||
    normalizedCondition.includes("tornado") ||
    normalizedCondition.includes("wind") ||
    windSpeed >= 10
  ) {
    return windyTheme;
  }
  if (normalizedCondition.includes("cloud") || weatherId >= 801) return cloudyTheme;
  if (isNight) return nightTheme;
  if (typeof temperature === "number" && temperature < 8) return snowTheme;
  if (typeof temperature === "number" && temperature > 30) return sunnyTheme;

  return sunnyTheme;
};

const normalizeHourlyForecast = (data) => {
  const forecast = data?.hourlyForecast || data?.hourly || data?.forecast || data?.list || [];

  return forecast.slice(0, 6).map((item, index) => {
    const condition = item?.weather?.[0]?.main || item?.condition || "Clear";
    const temperature = kelvinToCelsius(item?.main?.temp ?? item?.temp ?? item?.temperature);
    const date = item?.dt_txt ? new Date(item.dt_txt) : item?.dt ? new Date(item.dt * 1000) : null;
    const hour = date && !Number.isNaN(date.getTime()) ? `${date.getHours()}:00` : `${index + 1}:00`;

    return {
      time: item?.time || hour,
      temperature,
      condition,
      icon: item?.icon || item?.weather?.[0]?.icon || weatherIconMap[condition] || "\u2600\uFE0F",
      details: item,
    };
  });
};

const normalizeWeatherData = (data) => {
  const currentWeather = data?.weather?.[0] || {};
  const condition = currentWeather.main || data?.current?.condition || data?.condition || "";
  const description = currentWeather.description || data?.current?.description || condition;
  const temperature = kelvinToCelsius(data?.main?.temp ?? data?.current?.temperature ?? data?.temperature);
  const humidity = data?.main?.humidity ?? data?.current?.humidity ?? data?.humidity ?? null;
  const windSpeed = data?.wind?.speed ?? data?.current?.windSpeed ?? data?.windSpeed ?? null;
  const cloudCover = data?.clouds?.all ?? data?.current?.cloudCover ?? data?.cloudCover ?? null;
  const airQuality = data?.airQuality ?? data?.current?.airQuality ?? data?.aqi ?? "N/A";

  return {
    city: data?.name || data?.city?.name || data?.city || "",
    coord: data?.coord || null,
    current: {
      temperature,
      humidity,
      windSpeed,
      cloudCover,
      airQuality,
      condition,
      description,
      icon: weatherIconMap[condition] || data?.current?.icon || "\u2600\uFE0F",
      iconCode: currentWeather.icon || data?.current?.iconCode || "",
      weatherId: currentWeather.id ?? data?.current?.weatherId ?? null,
      details: data,
      hourlyForecast: normalizeHourlyForecast(data),
    },
  };
};

export const useWeatherStore = create((set, get) => ({
  city: "Chennai",
  weatherData: null,
  hourlyForecast: [],
  loading: false,
  error: null,
  theme: nightTheme,

  setCity: (city) => set({ city }),
  setWeatherData: (weatherData) => set({ weatherData }),
  setHourlyForecast: (hourlyForecast) => set({ hourlyForecast }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setTheme: (theme) => set({ theme }),

  fetchWeatherData: async (city = get().city) => {
    if (!city?.trim()) return;

    set({ loading: true, error: null });

    try {
      const response = await getWeather(city.trim());
      const rawData = response?.data || response;
      const weatherData = normalizeWeatherData(rawData);
      const hourlyForecast = weatherData.current.hourlyForecast;
      const theme = getThemeForWeather(weatherData.current);

      set({
        city: weatherData.city || city,
        weatherData,
        hourlyForecast,
        theme,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || error?.message || "Unable to fetch weather data.",
      });
    }
  },
}));
