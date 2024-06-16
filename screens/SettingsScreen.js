import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function SettingsScreen() {
  // Sample user data
  const username = "Dr. Simon Engelke";
  const email = "simon.engelke@battery.associates";
  const userPhotoUrl = "../assets/simon.png"; // Placeholder image URL

  return (
    <View style={styles.container}>
      <Image source={{ uri: userPhotoUrl }} style={styles.userPhoto} />
      <View style={styles.divider}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.infoText}>{username}</Text>
      </View>
      <View style={styles.divider}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.infoText}>{email}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 20,
    width: "80%", // Define a specific width for alignment
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
