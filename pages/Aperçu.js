import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/customers/Header'
import StoreHeader from '../components/customers/StoreHeader'

const Aperçu = ({navigation}) => {
  return (
    <View>
      <Header/>
      <StoreHeader navigation={navigation}/>
    </View>
  )
}

export default Aperçu