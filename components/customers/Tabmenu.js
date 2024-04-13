import { View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Manawa from '../../pages/customers/Manawa';
import MarketPlace from '../../pages/customers/MarketPlace';

const Tabmenu = () => {
  const Tab = createBottomTabNavigator()
  return (
    <View>
      {/* <Tab.Navigator>
        <Tab.Screen name="manawa" component={Manawa} />
        <Tab.Screen name="manawa" component={MarketPlace} />
      </Tab.Navigator> */}
    </View>
  )
}

export default Tabmenu