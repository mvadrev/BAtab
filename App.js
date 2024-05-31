import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ExperimentsScreen from "./screens/ExperimentsScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "white", // Color for active tab
            tabBarInactiveTintColor: "gray", // Color for inactive tabs
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 80, // Adjust the height of the tab bar
              paddingBottom: 10, // Adjust the padding to make the icons more spaced out
              backgroundColor: "black",
            },
            tabBarIconStyle: {
              marginTop: 5, // Adjust the margin to vertically align the icons
            },
            headerStyle: {
              backgroundColor: "black", // Change the background color of the header
            },
            headerTintColor: "#fff",
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
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
