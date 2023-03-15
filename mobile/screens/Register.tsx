import React, { useState, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Linking,
  Permissions,
  Modal,
} from "react-native";
import MapboxGL, { MapView } from "@rnmapbox/maps";

const tokenMapBox = "pk.eyJ1IjoiYmVnZGFyOHpvdWhhaXIiLCJhIjoiY2xlenBlcmVhMDFmbDNwcjI4OGN6MmduNyJ9.C8WddE7zeAKKPswFe7AEjA";

MapboxGL.setAccessToken(tokenMapBox);

const Register = () => {
  const navigation = useNavigation();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRegister = useCallback(async () => {
    try {
      const res = await fetch("http://192.168.0.171:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          companyName,
          email,
          password,
          phone,
          address,
          longitude,
          latitude,
        }),
      });
      const data = await res.json();
      if (data.error) {
        Alert.alert("Error", data.error, [{ text: "OK" }]);
      } else {
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log(err);
    }
  }, [companyName, email, password, phone, address, longitude, latitude, navigation]);

  useEffect(() => {
    (async () => {
      await MapboxGL.requestAndroidLocationPermissions();
    })();
  }, []);

  const handleOpenMap = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleMapPress = (e: any) => {
    const { geometry } = e;
    setLongitude(geometry.coordinates[0]);
    setLatitude(geometry.coordinates[1]);
  };

  return (

    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalMapContainer}>
              <MapboxGL.MapView
                style={styles.map}
                onPress={handleMapPress}
                styleURL={MapboxGL.StyleURL.Street}
              >
                <MapboxGL.UserLocation />
                <MapboxGL.Camera
                  zoomLevel={14}
                  centerCoordinate={[-7.58984375, 33.57311032714844]}
                />
                <MapboxGL.PointAnnotation
                  id="pointAnnotation"
                  coordinate={[longitude, latitude]}
                />
              </MapboxGL.MapView>
            </View>
            < View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            keyboardType="default"
            autoCapitalize="none"
            value={companyName}
            onChangeText={setCompanyName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            autoCapitalize="none"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={styles.input}
            placeholder="Address"
            keyboardType="default"
            autoCapitalize="none"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity style={styles.textMap} onPress={handleOpenMap}>
            <Text style={styles.buttonText}>Open Maps </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            keyboardType="numeric"
            autoCapitalize="none"
            value={longitude.toString()}
            onChangeText={setLongitude}

          />
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            keyboardType="numeric"
            autoCapitalize="none"
            value={latitude.toString()}
            onChangeText={setLatitude}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerText}>
              Already have an account?
              <Text style={styles.registerLink}>Login now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 28,
  },
  formContainer: {
    width: "85%",
  },
  input: {
    height: 45,
    backgroundColor: "#F9F9F9",
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  button: {
    height: 45,
    backgroundColor: "#0E8388",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    marginTop: 16,
    textAlign: "center",
  },
  registerLink: {
    color: "#0E8388",
    fontWeight: "bold",
  },
  textMap: {
    height: 45,
    backgroundColor: "#0E8388",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    height: 45,
    backgroundColor: "#fff",
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: "80%",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",

  },
  modalButton: {
    height: 45,
    backgroundColor: "#0E8388",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: "40%",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,

  },
  modalMapContainer: {
    width: "100%",
    height: "60%",
    marginBottom: 16,
  },
  map: {

    flex: 1,
  },
});

export default Register;




