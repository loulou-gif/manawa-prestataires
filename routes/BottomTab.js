import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Settings from '../pages/Settings';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons'

const BottomTab = () => {
    const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false}} activeColor='white' inactiveColor='white'  barStyle={{ backgroundColor: '#AB6E12', height:70, borderTopEndRadius:50 }}>
        <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () =>( <Icone name='calendar-edit' color='#7A4D09' size={26} />)}} />
        <Tab.Screen name="Services" component={Services} options={{ tabBarIcon: () =>( <Icone name='update' color='#7A4D09' size={26} />)}} />
        <Tab.Screen name='Settings' component={Settings} options={{ tabBarIcon: () =>( <Icone name='account' color='#7A4D09' size={26} />)}} />
    </Tab.Navigator>
  )
}

export default BottomTab