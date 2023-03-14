import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('<YOUR_ACCESSTOKEN>');

const App = () => {
    return (
        <View style={styles.container}>
            <Mapbox.MapView
                style={styles.map}
                zoomLevel={25}
                showUserLocation={true}
                logoEnabled={false}
                attributionEnabled={false}
                compassEnabled={false}
                centerCoordinate={[-7.58984375, 33.57311032714844]}
            >
                <Mapbox.Camera
                    zoomLevel={15}
                    animationMode={'flyTo'}
                    animationDuration={0}
                    zoomLevel={5}
                />
            </Mapbox.MapView>
        </View>


            
    );
}

export default App;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    map: {
        flex: 1,
    },

    


});