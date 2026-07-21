import { useEffect } from 'react';
import { WeatherCard, ForecastCard, GlassPanel } from '../../components';
import { Cloud, Droplets, Wind, Sun, AlertTriangle, Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWeatherStore } from '../../store/useWeatherStore';

export default function Dashboard() {
  const {
    city,
    weatherData,
    hourlyForecast,
    loading,
    error,
    setCity,
    fetchWeatherData,
  } = useWeatherStore();

  const currentWeather = weatherData?.current || {};
  const cityName = weatherData?.city || city;
  const temperature = currentWeather.temperature;
  const condition = currentWeather.condition || 'Weather';
  const weatherIcon = currentWeather.icon || '\u2600\uFE0F';

  useEffect(() => {
    if (!weatherData && city) {
      fetchWeatherData(city);
    }
  }, [city, fetchWeatherData, weatherData]);

  const formatValue = (value, suffix = '') => {
    if (value === null || value === undefined || value === '') return 'N/A';
    return `${value}${suffix}`;
  };

  const getForecastIcon = (forecastCondition = '') => {
    const normalizedCondition = forecastCondition.toLowerCase();

    if (normalizedCondition.includes('cloud')) return Cloud;
    if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) return Droplets;
    if (normalizedCondition.includes('wind') || normalizedCondition.includes('squall')) return Wind;

    return Sun;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(city);
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const highlights = [
    {
      title: 'Humidity',
      value: formatValue(currentWeather.humidity, '%'),
      icon: Droplets,
      description: condition,
    },
    {
      title: 'Wind',
      value: formatValue(currentWeather.windSpeed, ' km/h'),
      icon: Wind,
      description: condition,
    },
    {
      title: 'Cloud Cover',
      value: formatValue(currentWeather.cloudCover, '%'),
      icon: Cloud,
      description: condition,
    },
    {
      title: 'Air Quality',
      value: formatValue(currentWeather.airQuality),
      icon: AlertTriangle,
      description: 'AQI',
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 mt-[80px]"
    >
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <div>
          <p className="text-sm uppercase tracking-widest text-secondary/70 font-semibold">Weather Dashboard</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Search live conditions</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full lg:max-w-xl">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.28)] backdrop-blur-2xl focus-within:border-secondary/60 focus-within:bg-white/[0.1] transition-all duration-300">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-container/15 text-secondary">
              <MapPin className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Search city or location"
              className="min-w-0 flex-1 bg-transparent text-base font-medium text-white placeholder:text-white/45 outline-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-secondary-container px-5 font-bold text-on-secondary-container shadow-lg shadow-secondary-container/20 transition-colors hover:bg-white"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">{loading ? 'Loading' : 'Search'}</span>
            </motion.button>
          </div>
        </form>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlassPanel className="flex flex-col md:flex-row items-center justify-between gap-6 border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
          <div className="text-center md:text-left">
            <p className="mb-2 text-sm uppercase tracking-widest text-white/45">Current weather</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-glow">{cityName}</h2>
            <p className="text-white/60 text-lg">
              {error || `${condition}, ${formatValue(temperature, '\u00B0C')}`}
            </p>
          </div>
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-full bg-yellow-400/10 p-6"
          >
            <span className="block w-24 h-24 text-7xl leading-[6rem] text-center animate-glow">
              {weatherIcon}
            </span>
          </motion.div>
        </GlassPanel>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((card) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.25 }}
          >
            <WeatherCard {...card} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <GlassPanel>
            <h3 className="text-xl font-bold mb-4">Hourly Forecast</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {hourlyForecast.map((forecast, index) => (
                <motion.div
                  key={`${forecast.time}-${index}`}
                  initial={{ opacity: 0, x: 22 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ForecastCard
                    day={forecast.time}
                    temp={formatValue(forecast.temperature, '\u00B0')}
                    icon={getForecastIcon(forecast.condition)}
                  />
                </motion.div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassPanel>
            <h3 className="text-xl font-bold mb-4">Weekly Forecast</h3>
            <div className="space-y-4">
              {hourlyForecast.slice(0, 3).map((forecast, index) => {
                const ForecastIcon = getForecastIcon(forecast.condition);

                return (
                  <motion.div
                    key={`${forecast.time}-weekly-${index}`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + index * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-between items-center rounded-xl bg-white/[0.04] px-4 py-3 text-white/80"
                  >
                    <span>{forecast.time}</span>
                    <ForecastIcon className="w-5 h-5" />
                    <span>{formatValue(forecast.temperature, '\u00B0')}</span>
                  </motion.div>
                );
              })}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </motion.div>
  );
}
