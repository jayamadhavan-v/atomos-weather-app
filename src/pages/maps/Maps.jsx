import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { GlassPanel } from '../../components';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapLayer from './map_Components/MapLayer';
import MapLayerData from './map_Components/MapLayerData';
import FlyToLocation from './map_Components/FlyToLocation';
import LocationMarker from './map_Components/LocationMarker';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon paths in bundled app
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Maps() {

  const INDIA_CENTER = [20.5937, 78.9629];
  const BASE_TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <div className="w-full  mx-auto p-4 sm:p-6 lg:p-8 space-y-8 h-[100vh]">
      <GlassPanel className="h-full flex flex-col p-4">

        <div className="flex-grow rounded-xl overflow-hidden relative z-0">
          <MapLayer />
          <MapContainer
            center={INDIA_CENTER}
            minZoom={3}
            maxZoom={12}
            zoom={5}
            zoomControl={false}
            className='h-full w-full'
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors &copy; CARTO'
              updateWhenIdle
              updateInterval={250}
              keepBuffer={4}
              zIndex={1}
              url={BASE_TILE_URL}
            />
            <MapLayerData />
            <FlyToLocation />
            <LocationMarker />
          </MapContainer>
        </div>
      </GlassPanel>
    </div>
  );
}

