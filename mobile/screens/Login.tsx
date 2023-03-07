import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

const LoginScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();

  // const handleLogin = async (): Promise<void> => {
    try {
      const res = await fetch("http://192.168.0.171:5000/client/login", {
      // const res = await fetch("http://192.168.9.30:5000/client/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const text = await res.text();
      const data = JSON.parse(text);

      if (data.error) {
        Alert.alert("Error", data.error, [{ text: "OK" }]);
      } else {
        navigation.navigate("Nav");
      }
    } catch (err) {
      console.log(err);
    }            
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/container1.png")}
      />

      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        {/* <Image source={require("../assets/email.png")} style={styles.icon} /> */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.formContainer}>
        {/* <Image source={require("../assets/email.png")} style={styles.icon} /> */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerLink}> Register now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    height: 40,
    backgroundColor: "#F9F9F9",
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 40,
    backgroundColor: "#0E8388",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
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

export default LoginScreen;


