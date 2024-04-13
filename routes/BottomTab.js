import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Settings from '../pages/Settings';

const BottomTab = () => {
    const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Services" component={Services} />
        <Tab.Screen name='Settings' component={Settings}/>
    </Tab.Navigator>
  )
}

export default BottomTab