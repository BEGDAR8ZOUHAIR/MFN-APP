import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

 const tokenMapBox = "pk.eyJ1IjoiYmVnZGFyOHpvdWhhaXIiLCJhIjoiY2xlenBlcmVhMDFmbDNwcjI4OGN6MmduNyJ9.C8WddE7zeAKKPswFe7AEjA";

MapboxGL.setAccessToken(tokenMapBox);

const App = () => {
  // [Longitud , Latitude] 
  
  const coordinates = [-9.227203,32.300815];
  return (
    <MapboxGL.MapView style={{ flex: 1 }}>
      <MapboxGL.Camera
        zoomLevel={10}
        centerCoordinate={coordinates}
      />
      <MapboxGL.PointAnnotation
        id="pointAnnotation"
        coordinate={coordinates}
      />
    </MapboxGL.MapView>
   
  );
}

export default App;
