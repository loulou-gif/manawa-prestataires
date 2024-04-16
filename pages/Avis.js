import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/customers/Header'
// import StoreHeader from '../components/customers/StoreHeader'
import StoreHeaderAvis from '../components/customers/StoreHeaderAvis'

const Avis = ({navigation}) => {
  return (
    <View>
      <Header/>
      <StoreHeaderAvis navigation={navigation}/>
    </View>
  )
}

export default Avis