import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

const tokenMapBox = "pk.eyJ1IjoiYmVnZGFyOHpvdWhhaXIiLCJhIjoiY2xlenBlcmVhMDFmbDNwcjI4OGN6MmduNyJ9.C8WddE7zeAKKPswFe7AEjA";

MapboxGL.setAccessToken(tokenMapBox);

interface MarkerData {
  id: string;
  latitude: number;
  longitude: number;
  companyName: string;
  phone: number;
  email: string;
}

const CustomCallout = ({ companyName, phone , email}: { companyName: string, phone: number , email: string}) => (
  <View style={styles.calloutContainer}>
    <Text style={styles.calloutTitle}>{companyName}</Text>
    <Text style={styles.calloutSubtitle}>{phone}</Text>
    <Text style={styles.calloutSubtitle}>{email}</Text>
  </View>
);

const App = () => {
  const [mapStyle, setMapStyle] = useState<MapboxGL.StyleURL>('mapbox://styles/mapbox/streets-v11');
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-74.0066, 40.7135]);

  const loadMarkers = async () => {
    // const response = await fetch('http://192.168.0.171:5000/user/allUsers');
    const response = await fetch('http://192.168.9.30:5000/user/allUsers');
    const data = await response.json();
    setMarkers(data);
  };

  useEffect(() => {
    setTimeout(() => {
      setMapStyle('mapbox://styles/mapbox/satellite-v9');
      setMapCenter([-74.0066, 40.7135]);
    }, 2000);
  }, []);



  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={mapStyle}
        centerCoordinate={mapCenter}
        zoomLevel={20}
        showUserLocation={true}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
        onDidFinishLoadingMap={loadMarkers}
      >
        <MapboxGL.Camera
          zoomLevel={15}
          animationMode={'flyTo'}
          animationDuration={0}
          centerCoordinate={mapCenter}
        />

        {markers.map((marker,index) => (
          <MapboxGL.PointAnnotation
            key={index} // Add a unique key prop here
            // id={marker.id}
            coordinate={[marker.longitude, marker.latitude]}
          >
            <View style={styles.annotationContainer}>
              <View style={styles.annotationFill} />
            </View>
            <MapboxGL.Callout>
              <CustomCallout companyName={marker.companyName} phone={marker.phone} email={marker.email} />
            </MapboxGL.Callout>
          </MapboxGL.PointAnnotation>
        ))}
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
  annotationContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: 'red',
    transform: [{ scale: 0.6 }],
  },
  calloutContainer: {
    width: 140,
    height: 150,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    // justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  calloutTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    paddingBottom: 5,
    marginBottom: 5,

  },
  calloutSubtitle: {
    fontSize: 12,
  },





});

export default App;
