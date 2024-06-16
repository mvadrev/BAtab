import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toast from "react-native-toast-message";

const RegisterScreen = ({ navigation }) => {
  // Yup schema for validation
  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(
        "https://poc23.azurewebsites.net/register",
        values
      );
      Toast.show({
        type: "success",
        text1: "Registration successful",
        text2: "Please log in.",
      });
      console.log(response);
      navigation.navigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration error",
        text2: "Please try again later.",
      });
      console.error("Error during registration: ", error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => handleRegister(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <TextInput
            label="Username"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
            style={styles.input}
            mode="outlined"
            error={touched.username && errors.username}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
          <TextInput
            label="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            style={styles.input}
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            error={touched.email && errors.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <TextInput
            label="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            style={styles.input}
            mode="outlined"
            secureTextEntry
            textContentType="password"
            error={touched.password && errors.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TextInput
            label="Confirm Password"
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry
            textContentType="password"
            error={touched.confirmPassword && errors.confirmPassword}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Register
          </Button>
        </View>
      )}
    </Formik>
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
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginBottom: 5,
  },
});

export default RegisterScreen;
