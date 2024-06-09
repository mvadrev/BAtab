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

  const [mode, setMode] = useState("");
  const [Tcyc, setTcyc] = useState(0);
  const [V_in, setV_in] = useState(0);
  const [I_in, setI_in] = useState(0);
  const [V_batt, setV_batt] = useState(0);
  const [I_chg, setI_chg] = useState(0);
  const [T_batt, setT_batt] = useState(0);
  const [V_sys, setV_sys] = useState(0);
  const [I_ld, setI_ld] = useState(0);
  const [T_ld, setT_ld] = useState(0);
  const [SoC, setSoC] = useState(0);

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

      // Update all possible states with new data points
      setMode(dataObject.mode);
      setTcyc(parseFloat(dataObject.Tcyc));
      setV_in(parseFloat(dataObject.V_in));
      setI_in(parseFloat(dataObject.I_in));
      setV_batt(parseFloat(dataObject.V_batt));
      setI_chg(parseFloat(dataObject.I_chg));
      setT_batt(parseFloat(dataObject.T_batt));
      setV_sys(parseFloat(dataObject.V_sys));
      setI_ld(parseFloat(dataObject.I_ld));
      setT_ld(parseFloat(dataObject.T_ld));
      setSoC(parseFloat(dataObject.SoC));

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
      <View style={styles.chartContainer}>
        {dataPoints.length > 0 && (
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
              // fromZero: true,
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

      <View style={styles.grid}>
        <Text style={styles.item}>Tcyc: {Tcyc.toFixed(2)}</Text>
        <Text style={styles.item}>V_in: {V_in.toFixed(2)}</Text>
      </View>
      <View style={styles.grid}>
        <Text style={styles.item}>V_in: {V_in.toFixed(2)}</Text>
        <Text style={styles.item}>I_in: {I_in.toFixed(2)}</Text>
      </View>

      <View style={styles.grid}>
        <Text style={styles.item}>V_batt: {V_batt.toFixed(2)}</Text>
        <Text style={styles.item}>I_chg: {I_chg.toFixed(2)}</Text>
      </View>
      <View style={styles.grid}>
        <Text style={styles.item}>V_sys: {V_sys.toFixed(2)}</Text>
        <Text style={styles.item}>T_batt: {T_batt.toFixed(2)}</Text>
      </View>
      <View style={styles.grid}>
        <Text style={styles.item}> I_ld: {I_ld.toFixed(2)}</Text>
        <Text style={styles.item}> T_ld: {T_ld.toFixed(2)}</Text>
        {/* <View style={styles.item}>SoC: {SoC.toFixed(2)}</View> */}
      </View>

      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 20,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  chartContainer: {
    width: "100%", // Ensure the container takes full width to center the chart properly
    alignItems: "center", // Center children horizontally
    justifyContent: "center", // Center children vertically
    // padding: 5,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  item: {
    width: "40%", // Approximately half the width of the container minus padding
    margin: "1%",
    padding: 10,
    marginTop: 10,
    backgroundColor: "green",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});
