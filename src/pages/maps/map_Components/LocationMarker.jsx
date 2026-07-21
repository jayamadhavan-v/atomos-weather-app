import { Marker, Popup } from 'react-leaflet';
import { useWeatherStore } from '../../../store/useWeatherStore';

const LocationMarker = () => {
  const weatherData = useWeatherStore((state) => state.weatherData);

  const coord = weatherData?.coord || weatherData?.current?.details?.coord;
  if (!coord || typeof coord.lat !== "number" || typeof coord.lon !== "number") {
    return null;
  }

  const position = [coord.lat, coord.lon];
  const cityName = weatherData?.city || "Selected Location";
  const temperature = weatherData?.current?.temperature;
  const condition = weatherData?.current?.condition;

  return (
    <Marker position={position}>
      <Popup>
        <div className="text-gray-900 font-medium p-1">
          <h3 className="font-bold text-base text-blue-600 mb-1">{cityName}</h3>
          {temperature !== undefined && temperature !== null && (
            <p className="text-sm my-0.5">Temperature: <span className="font-semibold">{temperature}°C</span></p>
          )}
          {condition && (
            <p className="text-sm my-0.5">Condition: <span className="font-semibold">{condition}</span></p>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default LocationMarker;