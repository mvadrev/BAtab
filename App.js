import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./screens/SettingsScreen";
import ExperimentsScreen from "./screens/ExperimentsScreen";
import LoginScreen from "./screens/LoginScreen";
import Control from "./screens/Control";
import Control2 from "./screens/Control2";

import Dashboard from "./screens/Dashboard";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          backgroundColor: "#18291A",
        },
        tabBarIconStyle: { marginTop: 5 },
        headerStyle: { backgroundColor: "#18291A" },
        headerTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="rocket" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Experiments"
        component={ExperimentsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerStyle: {
                backgroundColor: "#18291A", // Sets the header background color to black
              },
              headerTintColor: "#fff", // Sets the header text and icons color to white
            }}
          />
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#18291A", // Correctly placed inside headerStyle
              },
              headerTintColor: "#fff",
            }}
          />

          <Stack.Screen
            name="Control"
            component={Control}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "#18291A", // Correctly placed inside headerStyle
              },
              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
