import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

 const tokenMapBox = "pk.eyJ1IjoiYmVnZGFyOHpvdWhhaXIiLCJhIjoiY2xlenBlcmVhMDFmbDNwcjI4OGN6MmduNyJ9.C8WddE7zeAKKPswFe7AEjA";

MapboxGL.setAccessToken(tokenMapBox);

const App = () => {
  const [mapStyle, setMapStyle] = useState<MapboxGL.StyleURL>('mapbox://styles/mapbox/streets-v11');
  const [mapCenter, setMapCenter] = useState<[number, number]>([-74.0066, 40.7135]);


  useEffect(() => {
    setTimeout(() => {
      setMapStyle('mapbox://styles/mapbox/satellite-v9');
      setMapCenter([-74.0066, 40.7135]);

    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} styleURL={mapStyle}>
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={mapCenter}
        />

        <MapboxGL.PointAnnotation
          id="pointAnnotation"
          coordinate={mapCenter}
        />
        
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  userLocation: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;


