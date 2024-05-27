// screens/HomeScreen.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  const [text, setText] = React.useState("");
  const [checked, setChecked] = React.useState("first");

  return (
    <View style={styles.container}>
      <Text>Enter the parameters to start the Experiment</Text>
      <View style={styles.form}>
        <View style={styles.topSpacer}>
          <TextInput
            label="Nominal Voltage"
            value={text}
            onChangeText={(text) => setText(text)}
            style={{ backgroundColor: "white" }}
            mode="outlined"
          />
        </View>
        <View style={styles.topSpacer}>
          <TextInput
            label="Max Current"
            value={text}
            onChangeText={(text) => setText(text)}
            style={{ backgroundColor: "white" }}
            mode="outlined"
          />
        </View>

        <View style={styles.radioButtonContainerTop}>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
            />
            <Text style={styles.radioLabel}>LFP</Text>
          </View>

          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
            />
            <Text style={styles.radioLabel}>NMC</Text>
          </View>

          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
            />
            <Text style={styles.radioLabel}>LCO</Text>
          </View>
        </View>

        <View style={styles.topSpacer}>
          <TextInput
            label="Form factor"
            value={text}
            onChangeText={(text) => setText(text)}
            style={{ backgroundColor: "white" }}
            mode="outlined"
          />
        </View>

        <View style={styles.topSpacer}>
          <TextInput
            label="Cathode"
            value={text}
            onChangeText={(text) => setText(text)}
            style={{ backgroundColor: "white" }}
            mode="outlined"
          />
        </View>

        <View style={styles.topSpacer}>
          <TextInput
            label="Anode"
            value={text}
            onChangeText={(text) => setText(text)}
            style={{ backgroundColor: "white" }}
            mode="outlined"
          />
        </View>
        <View style={styles.topSpacer}>
          <Button
            // icon="camera"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Start Experiment
          </Button>
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50, // Adjust this value as needed
    paddingHorizontal: 20, // Add padding to ensure proper spacing
  },
  headerText: {
    fontSize: 18,
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  input: {
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fff",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 5,
  },

  radioButtonContainerTop: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  topSpacer: {
    marginTop: 40,
  },
});
