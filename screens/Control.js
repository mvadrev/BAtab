import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Client, Message } from "paho-mqtt";
import { LineChart } from "react-native-chart-kit";

export default function Control({ route }) {
  const { formData } = route.params;
  const [client, setClient] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const brokerUrl = "b29ed685441749cd86432c8680b3fb1a.s2.eu.hivemq.cloud";
    const port = 8884; // WebSocket secure port for HiveMQ Cloud
    const clientId = "clientId-" + Math.random().toString(16).substr(2, 8);
    const mqttClient = new Client(`wss://${brokerUrl}:${port}/mqtt`, clientId);

    mqttClient.connect({
      useSSL: true,
      userName: "vadrev",
      password: "Qwerty@123",
      onSuccess: () => {
        console.log("Connected to MQTT broker");
        setClient(mqttClient);

        mqttClient.subscribe("experiment", {
          onSuccess: () => {
            console.log("Subscribed to topic: experiment");

            const startMessage = new Message(
              JSON.stringify({
                signal: "start",
                cycles: 4,
                vstp_chg: 3000,
                vs_min: 3000,
                lvdc: 2000,
                ich: 1000,
                ild: 1000,
                ratedcapacity: 3000,
                batterytype: "LFP",
              })
            ); //new Message("start");
            startMessage.destinationName = "controlTopic";
            mqttClient.send(startMessage);
            console.log("Start message sent to topic: controlTopic");
          },
          onFailure: (error) => {
            console.log("Subscription failed:", error.errorMessage);
          },
        });
      },
      onFailure: (error) => {
        console.log("Connection failed:", error.errorMessage);
      },
    });

    mqttClient.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:", responseObject.errorMessage);
      }
    };

    mqttClient.onMessageArrived = (message) => {
      const payloadString = message.payloadString;
      console.log("onMessageArrived: Value:", payloadString);
      // Add detailed logging to check the payload content
      const dataObject = JSON.parse(payloadString);
      console.log("Parsed value:", dataObject["V_batt"]);

      if (dataObject["V_batt"] !== undefined && !isNaN(dataObject["V_batt"])) {
        const timestamp = new Date().toLocaleTimeString();

        // Update the state with new data points
        setDataPoints((prevDataPoints) => [
          0,
          ...prevDataPoints,
          parseFloat(dataObject["V_batt"] / 1000),
        ]);
        setTimestamps((prevTimestamps) => [...prevTimestamps, timestamp]);
      } else {
        console.log("Received NaN value, skipping...");
      }
    };

    return () => {
      if (mqttClient && mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, []);

  return (
    <View Style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.container}> */}
      <View>
        <Text>Experiment</Text>
        <Text>Form Data: {JSON.stringify(formData)}</Text>
      </View>
      <View style={styles.chartContainer}>
        {dataPoints.length > -1 && (
          <LineChart
            data={{
              labels: [], // No labels needed
              datasets: [
                {
                  data: dataPoints,
                  color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Bright green
                },
              ],
            }}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
              backgroundColor: "#000", // Dark background like an oscilloscope
              backgroundGradientFrom: "#000",
              backgroundGradientTo: "#000",
              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Bright green waveform
              labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`, // Transparent labels
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "1",
                strokeWidth: "0.5",
                stroke: "#ffa726", // Customizing dot colors if needed
              },
              fromZero: true,
            }}
            bezier
            style={{
              marginVertical: 8,
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
          />
        )}
      </View>

      <StatusBar style="auto" />
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  chartContainer: {
    width: "100%", // Ensure the container takes full width to center the chart properly
    alignItems: "center", // Center children horizontally
    justifyContent: "center", // Center children vertically
  },
});
