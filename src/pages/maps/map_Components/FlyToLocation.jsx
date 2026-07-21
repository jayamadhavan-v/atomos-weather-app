import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useWeatherStore } from "../../../store/useWeatherStore";

const FlyToLocation = () => {
  const map = useMap();
  const weatherData = useWeatherStore((state) => state.weatherData);

  useEffect(() => {
    const coord = weatherData?.coord || weatherData?.current?.details?.coord;
    if (coord && typeof coord.lat === "number" && typeof coord.lon === "number") {
      map.flyTo([coord.lat, coord.lon], 12, {
        animate: true,
        duration: 2.0,
      });
    }
  }, [weatherData, map]);

  return null;
};

export default FlyToLocation;