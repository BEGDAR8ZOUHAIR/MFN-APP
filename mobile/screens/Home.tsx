import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MarkerData {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

const App = (): JSX.Element => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // const loadMarkers = async (): Promise<void> => {
  //   try {
  //     const response = await fetch(
  //       // "http://192.168.43.154:5000/client/scooters"
  //       "http://192.168.9.30:5000/client/scooters"

  //     );
  //     const text = await response.text();
  //     const data = JSON.parse(text);
  //     setMarkers(data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   loadMarkers();
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.749,
          longitude: -84.388,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {isLoading
          ? null
          : markers.map((marker: MarkerData, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name}
                description={marker.description}
                pinColor="#2E7D32"
              />
            ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default App;
