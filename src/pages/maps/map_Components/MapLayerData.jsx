import { TileLayer } from 'react-leaflet';
import useMapStore from "../../../store/useMapStore";

const MapLayerData = () => {

    const OPENWEATHER_TILE_URL = "https://tile.openweathermap.org/map";
    const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY || "13f23a58d3df706a6a1cf0c3c38ca67a";

    const {selectedLayer}  = useMapStore();

    return (
        <TileLayer
            key={selectedLayer}
            updateWhenIdle
            updateInterval={250}
            keepBuffer={4}
            zIndex={2}
            url={`${OPENWEATHER_TILE_URL}/${selectedLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
        />
    )
}

export default MapLayerData;