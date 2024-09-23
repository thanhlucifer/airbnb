import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibHVjaWZlcjEyMzc4OSIsImEiOiJjbTFmMXh4eTQxM25lMmtxcDNmZXVwemRrIn0.WNtCyHWdrDALC8iL_ld9LQ';

const MapComponent = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/lucifer123789/cm1ezx3v702ni01pm6uyc6epg',
      center: [106.708983, 10.765648],
      zoom: 13,
      attributionControl: false 
    });

    // Thêm các control
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserLocation: true
    }), 'top-left');

    return () => map.remove();
  }, []);

  return (
    <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%', height: '100%'}} />
  );
};

export default MapComponent;
