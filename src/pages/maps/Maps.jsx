import React from 'react';
import { GlassPanel } from '../../components';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Maps() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 mt-6 h-[80vh]">
      <GlassPanel className="h-full flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-4">Interactive Radar</h2>
        <div className="flex-grow rounded-xl overflow-hidden relative z-0">
          <MapContainer center={[40.7128, -74.0060]} zoom={10} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </MapContainer>
        </div>
      </GlassPanel>
    </div>
  );
}
