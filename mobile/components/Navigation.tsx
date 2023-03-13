import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import Setting from "../screens/Setting";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "relative",
          // bottom: 25,
          // left: 20,
          // right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 70,
          ...styles.shadow,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // top: 10,
              }}
            >
              <Ionicons
                name="home"
                size={focused ? 30 : 25}
                color={focused ? "#0E8388" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#0E8388" : "#748c94",
                  fontSize: 12,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="List" component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // top: 10,
              }}
            >
              <Ionicons
                name="list"
                size={focused ? 30 : 25}
                color={focused ? "#0E8388" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#0E8388" : "#748c94",
                  fontSize: 12,
                }}
              >
                List
              </Text>
            </View>
          ),
        }}

          
      />
      <Tab.Screen name="Setting" component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // top: 10,
              }}
            >
              <Ionicons
                name="settings"
                size={focused ? 30 : 25}
                color={focused ? "#0E8388" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#0E8388" : "#748c94",
                  fontSize: 12,
                }}
              >
                Setting
              </Text>
            </View>
          ),
        }}
      />

              
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // top: 10,
              }}
            >
              <Ionicons
                name="person"
                size={focused ? 30 : 25}  
                color={focused ? "#0E8388" : "#748c94"}
              />
              <Text
                style={{
                  color: focused ? "#0E8388" : "#748c94",
                  fontSize: 12,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#0E8388",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
