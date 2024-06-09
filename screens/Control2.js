import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Control2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Control Component</Text>
      {/* Additional components and logic can be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8", // Light grey background color
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Dark grey text color
  },
});

export default Control2;
