import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMapEvent, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import VehicleTooltip from "./VehicleTooltip";
import ConfigureCard from "./ConfigureCard";
import "../styles/MapView.css";

// Custom car icon function to handle direction
const createCarIcon = (direction) => {
  const rotation = {
    'N': 0,
    'E': 90,
    'S': 180,
    'W': 270,
    'NE': 45,
    'SE': 135,
    'SW': 225,
    'NW': 315
  }[direction] || 0;

  return L.divIcon({
    className: "car-icon",
    html: `<div class="car-emoji" style="transform: rotate(${rotation}deg)">🚗</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Haversine distance function
function haversine([lat1, lon1], [lat2, lon2]) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function MapAutoPan({ target }) {
  const map = useMapEvent("move", () => {});
  useEffect(() => {
    if (target) map.panTo(target, { animate: true });
  }, [target, map]);
  return null;
}

export default function MapView() {
  const [route, setRoute] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [markerPos, setMarkerPos] = useState(null);
  const [index, setIndex] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    fetch("/dummy-route.json")
      .then((res) => res.json())
      .then((data) => {
        const points = data.map((p) => ({
          lat: p.latitude,
          lng: p.longitude,
          ts: new Date(p.timestamp).getTime(),
        }));
        setRoute(points);
        setMarkerPos([points[0].lat, points[0].lng]);
        
        // Calculate total distance
        let distance = 0;
        for (let i = 1; i < points.length; i++) {
          distance += haversine(
            [points[i-1].lat, points[i-1].lng],
            [points[i].lat, points[i].lng]
          );
        }
        setTotalDistance(distance / 1000); // Convert to kilometers
      });
  }, []);

  useEffect(() => {
    if (!playing || route.length === 0) return;

    const current = route[index];
    const next = route[index + 1];
    if (!next) {
      setPlaying(false);
      return;
    }

    const duration = (next.ts - current.ts) / speed;
    const start = performance.now();

    function animate(now) {
      const t = Math.min(1, (now - start) / duration);
      const lat = current.lat + (next.lat - current.lat) * t;
      const lng = current.lng + (next.lng - current.lng) * t;
      setMarkerPos([lat, lng]);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setIndex((i) => i + 1);
      }
    }
    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [playing, route, index, speed]);

  const handlePlayPause = () => setPlaying((prev) => !prev);

  const handleReset = () => {
    setPlaying(false);
    setIndex(0);
    if (route.length) setMarkerPos([route[0].lat, route[0].lng]);
  };

  const speedKmh = (() => {
    if (index >= route.length - 1) return 0;
    const a = route[index], b = route[index + 1];
    const dist = haversine([a.lat, a.lng], [b.lat, b.lng]);
    const dt = (b.ts - a.ts) / 1000;
    return ((dist / dt) * 3.6 * speed).toFixed(2);
  })();

  return (
    <div className="mapview-root">
      <div className="controls">
        <button onClick={handlePlayPause}>{playing ? "Pause" : "Play"}</button>
        <button onClick={handleReset}>Reset</button>

        <label>
          Speed x
          <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
            <option value={0.5}>0.5</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
        </label>

        <div className="meta">
          <div>Index: {index}/{route.length - 1}</div>
          <div>Speed: {speedKmh} km/h</div>
          <div>
            Pos: {markerPos ? `${markerPos[0].toFixed(5)}, ${markerPos[1].toFixed(5)}` : "—"}
          </div>
        </div>
      </div>

      <div className="map-container">
        {markerPos && (
          <MapContainer center={markerPos} zoom={17} style={{ height: "100%", width: "100%" }}>
            <ConfigureCard />
            <TileLayer
              attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline positions={route.map((p) => [p.lat, p.lng])} />
            <Marker 
              position={markerPos} 
              icon={createCarIcon(route[index]?.direction || 'N')}
            >
              <Popup closeButton={false} className="vehicle-popup">
                <VehicleTooltip 
                  speed={Number(speedKmh)}
                  distance={totalDistance}
                  batteryLife={85}
                  status="Running"
                />
              </Popup>
            </Marker>
            <MapAutoPan target={markerPos} />
          </MapContainer>
        )}
      </div>
    </div>
  );
}
