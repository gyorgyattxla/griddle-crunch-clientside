import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  locationNames: string[]; // array of location names
}

// Resize fix
const ResizeFix = () => {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    const container = map.getContainer();
    if (container) observer.observe(container);
    return () => observer.disconnect();
  }, [map]);
  return null;
};

// Fit map to all markers
const FitToAllMarkers: React.FC<{ positions: [number, number][] }> = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(positions);
    } else if (positions.length === 1) {
      map.flyTo(positions[0], 16);
    }
  }, [positions, map]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ locationNames }) => {
  const hungaryCenter: [number, number] = [47.1625, 19.5033];
  const [markerData, setMarkerData] = useState<{ name: string; position: [number, number] }[]>([]);

  useEffect(() => {
    const fetchCoordinates = async (name: string): Promise<{ name: string; position: [number, number] } | null> => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}`);
        const data: { lat: string; lon: string }[] = await response.json();
        if (data.length > 0) {
          return { name, position: [parseFloat(data[0].lat), parseFloat(data[0].lon)] };
        }
      } catch (err) {
        console.error(`Failed to fetch coordinates for ${name}:`, err);
      }
      return null;
    };

    const loadAllCoordinates = async () => {
      const results = await Promise.all(locationNames.map(fetchCoordinates));
      const validResults = results.filter((r): r is { name: string; position: [number, number] } => r !== null);
      setMarkerData(validResults);
    };

    loadAllCoordinates();
  }, [locationNames]);

  return (
    <div style={{ height: '600px', width: '600px' }}>
      <MapContainer
        center={markerData[0]?.position || hungaryCenter}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <ResizeFix />
        {markerData.length > 0 && <FitToAllMarkers positions={markerData.map((m) => m.position)} />}
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerData.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;