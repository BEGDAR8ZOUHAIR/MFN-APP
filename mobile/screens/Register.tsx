import React, { useState, useCallback } from "react";
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
} from "react-native";

const Register = () => {
  const navigation = useNavigation();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const handleRegister = useCallback(async () => {
    try {
      // const res = await fetch("http://192.168.9.30:5000/user/register", {
      const res = await fetch("http://192.168.9.30:5000/user/register", {
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

  const openMaps = useCallback(() => {
    const url = `https://www.google.com/maps/search/?api=1&query= ${latitude} , ${longitude}`;
    Linking.openURL(url);
  }, [latitude, longitude]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
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
          <TouchableOpacity style={styles.textMap} onPress={openMaps}>
            <Text style={styles.buttonText}>Open Maps </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder=" E.g -7.797068"
            keyboardType="default"
            autoCapitalize="none"
            value={longitude}
            onChangeText={setLongitude}
          />

          <TextInput
            style={styles.input}
            placeholder=" E.g 110.370529"
            keyboardType="default"
            autoCapitalize="none"
            value={latitude}
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
});

export default Register;




