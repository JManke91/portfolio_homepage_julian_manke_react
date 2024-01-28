import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './OpenStreetMap.css';
import L from 'leaflet';

const OpenStreetMap = ({ gpxFileUrl }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [map, setMap] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(gpxFileUrl);
        const data = await response.json();

        setGeoJsonData(data);

      } catch (error) {
        console.error('Error fetching or processing the file:', error);
      }
    };

    fetchData();
  }, []); // Include L in the dependency array


  const handleGeoJSONReady = () => {
    if (map && geoJsonData && geoJsonData.features.length > 0) {
      let bounds = L.latLngBounds(); // Initialize an empty bounds object

      // Iterate over each feature (assuming each feature represents a part of the route)
      geoJsonData.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates;

        // Iterate over each coordinate and extend the bounds
        coordinates.forEach(coord => {
          bounds.extend(L.latLng(coord[1], coord[0])); // Leaflet uses (lat, lng) order
        });
      });


      map.whenReady(() => {
        map.fitBounds(bounds, { padding: [20, 20] });
        map.setZoom(3); // Set the desired zoom level

        // Visualize bounds as a rectangle
        // const rectangle = L.rectangle(bounds, { color: 'red', weight: 2 }).addTo(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          className: 'map-tiles'
        }).addTo(map);

      })

    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('Not available');
      }
    }
  };

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '400px', width: '100%' }}
        ref={setMap}
      >
        {geoJsonData && <GeoJSON data={geoJsonData} style={{ color: 'white' }} eventHandlers={{ add: handleGeoJSONReady }} />}
      </MapContainer>
    </div>
  );
};

export default OpenStreetMap;

