import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
import Home from './home'
import Search from './search'
import Saved from './saved'
export default function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused? 'home': 'home-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        }
        else if (route.name === 'Saved') {
          iconName = focused ? 'bookmark' : 'bookmark-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        showLabel: false,
        labelStyle: {
          fontSize: 18,
          fontWeight: '500',
        }
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Saved" component={Saved} />
    </Tab.Navigator>
  );
}