import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import MapboxGL, { MapView } from '@rnmapbox/maps';
// import location from expo-location

const tokenMapBox = "pk.eyJ1IjoiYmVnZGFyOHpvdWhhaXIiLCJhIjoiY2xlenBlcmVhMDFmbDNwcjI4OGN6MmduNyJ9.C8WddE7zeAKKPswFe7AEjA";

MapboxGL.setAccessToken(tokenMapBox);


interface MarkerData {
  _id: string;
  latitude: number;
  longitude: number;
  companyName: string;
  phone: number;
  email: string;
}


const CustomCallout = ({ companyName, phone, email }: { companyName: string, phone: number, email: string }) => (
  <View style={styles.calloutContainer}>
    <Text style={styles.calloutTitle}>{companyName}</Text>
    <Text style={styles.calloutSubtitle}>{phone}</Text>
    <Text style={styles.calloutSubtitle}>{email}</Text>
  </View>
);


const App = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const loadMarkers = async () => {
    const response = await fetch('http://192.168.0.171:5000/user/allUsers');
    // const response = await fetch('http://192.168.0.171:5000/user/allUsers');
    const data = await response.json();
    setMarkers(data);
  };

  useEffect(() => {
    (async () => {
      await MapboxGL.requestAndroidLocationPermissions();
    })();

    loadMarkers();

  }, []);



  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        zoomLevel={20}
        showUserLocation={true}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
        onDidFinishLoadingMap={loadMarkers}
        centerCoordinate={[-7.58984375, 33.57311032714844]}
      >
        <MapboxGL.UserLocation
          visible={true}
          androidRenderMode={'normal'}
          animated={true}
          onUpdate={userLocation => console.log(userLocation)}
        />


        <MapboxGL.Camera
          zoomLevel={15}
          animationMode={'flyTo'}
          animationDuration={0}
          zoomLevel={5}
          centerCoordinate={[-7.58984375, 33.57311032714844]}
        />


        {markers.map((marker, index) => (
          <MapboxGL.PointAnnotation
            key={index}
            id={marker._id}
            coordinate={[marker.longitude, marker.latitude]}
            calloutOffset={{ x: -15, y: 10 }}
          >
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

  calloutContainer: {
    width: 150,
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
