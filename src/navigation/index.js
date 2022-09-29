import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Register } from "../screens/register/register";
import { Login } from "../screens/login/login";
import { Home } from "../screens/home/home";
import { Profile } from "../screens/profile/profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeNav() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "ios-home-outline"}
              size={20}
              color={focused ? "blue" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={20}
              color={focused ? "blue" : "grey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { Nav };
