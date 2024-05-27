// screens/SettingsScreen.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function ExperimentsScreen() {
  const [text, setText] = React.useState("");
  return (
    <View style={styles.container}>
      <Text>Welcome to the Experiments Screen!</Text>
      {/* <TextInput
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
      /> */}
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
});
