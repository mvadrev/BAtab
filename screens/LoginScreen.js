import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your authentication logic here
    // For example, if login is successful:
    navigation.navigate("Main");
    // Otherwise, handle errors (e.g., show an error message)
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
      <Button mode="contained" style={styles.button2}>
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
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default LoginScreen;
