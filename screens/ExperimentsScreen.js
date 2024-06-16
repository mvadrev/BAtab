// screens/SettingsScreen.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function ExperimentsScreen() {
  const [text, setText] = React.useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://poc23.azurewebsites.net//getAllData"
      );
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {data ? (
          data.map((dataset) => (
            <View key={dataset._id} style={styles.item}>
              <Text style={styles.title}>{dataset.itemName}</Text>
              {dataset.measurements.length > 0 ? (
                <Text>Measurements: {dataset.measurements.join(", ")}</Text>
              ) : (
                <Text>No measurements available.</Text>
              )}
            </View>
          ))
        ) : (
          <View>
            <Text>hhh</Text>
          </View>
        )}
      </View>
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
    padding: 10,
    backgroundColor: "#fff",
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
