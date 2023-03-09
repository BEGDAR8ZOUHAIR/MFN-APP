import React, { useState } from "react";
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
} from "react-native";

const Register = () => {
  const navigation = useNavigation();
//  companyName, email, password, phone, address, longitude, latitude 
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");


  const handleRegister = async () => {
    try {
      const res = await fetch("http://192.168.9.30:5000/user/register", {
      // const res = await fetch("http://192.168.0.171:5000/user/register", {
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
          latitude

       
        }),
      });
      const text = await res.text();
      const data = JSON.parse(text);
      if (data.error) {
        Alert.alert("Error", data.error, [{ text: "OK" }]);
      } else {
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
    <View style={styles.container}>
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/container2.png")}
      />

      <Text style={styles.title}>Register</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          keyboardType="default"
          autoCapitalize="none"
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          keyboardType="default"
          autoCapitalize="none"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Longitude"
          keyboardType="default"
          autoCapitalize="none"
          value={longitude}
          onChangeText={(text) => setLongitude(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Latitude"
          keyboardType="default"
          autoCapitalize="none"
          value={latitude}
          onChangeText={(text) => setLatitude(text)}
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
    marginTop: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 48,
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
});

export default Register;


