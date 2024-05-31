// screens/HomeScreen.js
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import { Button } from "react-native-paper";
import * as yup from "yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function HomeScreen() {
  const schema = yup.object().shape({
    nominalVoltage: yup
      .number()
      .required("Nominal voltage is required")
      .positive("Must be a positive number"),
    maxCurrent: yup
      .number()
      .required("Max current is required")
      .positive("Must be a positive number"),

    formFactor: yup.string().required("Form factor is required"),
    cathode: yup.string().required("Cathode is required"),
    anode: yup.string().required("Anode is required"),
    chemistry: yup
      .string()
      .required("Battery type is required")
      .oneOf(["LFP", "NMC", "LCO"], "Invalid battery type"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Hit");
    if (isValid) {
      console.log(data);
    }
    // Add additional submit logic here
  };

  const [text, setText] = useState("");
  const [checked, setChecked] = React.useState("first");

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Enter the parameters to start the Experiment
      </Text>

      <View style={styles.form}>
        <Controller
          control={control}
          name="nominalVoltage"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.topSpacer}>
              <TextInput
                label="Nominal Voltage"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="numeric"
                placeholder="Enter nominal voltage"
                style={{ backgroundColor: "white" }}
                mode="outlined"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="maxCurrent"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.topSpacer}>
              <TextInput
                label="Max Current"
                value={value}
                keyboardType="numeric"
                onChangeText={onChange}
                placeholder="Enter max current"
                style={{ backgroundColor: "white" }}
                mode="outlined"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="formFactor"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.topSpacer}>
              <TextInput
                label="Form factor"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Enter cell chemistry"
                style={{ backgroundColor: "white" }}
                mode="outlined"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="cathode"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.topSpacer}>
              <TextInput
                label="Cathode"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                style={{ backgroundColor: "white" }}
                mode="outlined"
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="anode"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.topSpacer}>
              <TextInput
                label="Anode"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                style={{ backgroundColor: "white" }}
                mode="outlined"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="chemistry"
          rules={{ required: true }} // This ensures the field is considered in validation
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.radioButtonContainerTop}>
              {["LFP", "NMC", "LCO"].map((type) => (
                <View key={type} style={styles.radioButtonContainer}>
                  <RadioButton.Android
                    value={type}
                    status={value === type ? "checked" : "unchecked"}
                    onPress={() => {
                      onChange(type);
                    }}
                  />
                  <Text style={styles.radioLabel}>{type}</Text>
                </View>
              ))}
            </View>
          )}
        />

        <View style={styles.topSpacer}>
          <Button
            // icon="camera"
            mode="contained"
            onPress={handleSubmit(onSubmit)}
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
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
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
    marginTop: 30,
  },
});
