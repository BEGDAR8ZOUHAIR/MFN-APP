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
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";

const LoginScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const navigation = useNavigation();

  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch("http://192.168.0.171:5000/user/login", {
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

      if (res.status === 401) {
        setEmailValid(false);
        setPasswordValid(false);
      } else if (res.status === 200) {
        navigation.navigate("Nav");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.", [
          { text: "OK" },
        ]);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (value: string): void => {
    setEmail(value);
    setEmailValid(true);
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
    setPasswordValid(true);
    
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/container1.png")}
      />

      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            !emailValid && {
              borderColor: "red", borderWidth: 2,},
          ]}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={handleEmailChange}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            !passwordValid && { borderColor: "red", borderWidth: 2 },
          ]}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0E8388" />
      ) : (
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.formContainer}>
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text
            style={styles.registerLink}

            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </Text>
         <TouchableOpacity style={styles.buttonMaps} onPress={() => navigation.navigate("Nav")}>
          <Icon name="map-signs" type="font-awesome" color="tomato" size={34} />
          <Text style={styles.mapText}>Go To Maps</Text>
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
    marginTop: 60,

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
  buttonMaps: {
    height: 40,
    // backgroundColor: "#0E8388",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 40,
    
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: {
    color: "tomato",
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


