import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Example data to be sent with the POST request
      const loginData = {
        username: email,
        password: password,
      };

      const response = await axios.post(
        "http://192.168.4.22:3000/login",
        loginData
      );
      Toast.show({
        type: "success",
        text1: "Logging in..",
        text2: "Success",
      });
      console.log(response);
      // toast("Hello World");
      navigation.navigate("Main");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Sec",
      });
      // toast("Incorrect credentials..");
      console.error("Error fetching data: ", error);
    }
  };

  const handleRegister = () => {
    console.log("Registering..");
    navigation.navigate("RegisterScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
      <View>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
          textContentType="password"
        />
      </View>

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Log In
      </Button>
      <Button mode="contained" onPress={handleRegister} style={styles.button2}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  boxes: {
    paddingTop: 20,
  },
  logo: {
    width: 100, // Set your desired dimensions
    height: 100, // Set your desired dimensions
    alignSelf: "center", // Centers the logo horizontally
    marginBottom: 20, // Provides space between the logo and the title
  },
  input: {
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
  },
  button2: {
    marginTop: 20,
    color: "#003366",
    backgroundColor: "#18291A",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
