import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/customers/Header'
// import StoreHeader from '../components/customers/StoreHeader'
import StoreHeaderAvis from '../components/customers/StoreHeaderAvis'

const Avis = ({navigation}) => {
  return (
    <View>
      <Header/>
      <StoreHeaderAvis navigation={navigation}/>
      <View style={styles.card}>
        <View style={styles.circle}></View>
        <View style={styles.text}>
          <Text style={styles.name}>Nom</Text>
          <Text style={styles.comment}>Commentaire</Text>
        </View>
        <View style={styles.stars}>
          <Text>stars</Text>
        </View>
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
  circle:{
    backgroundColor:'#7A4D09',
    width:70,
    height:70,
    borderRadius:40
  },
  card:{
    borderWidth:1,
    borderColor:'#D9D9D9',
    marginTop:10,
    flexDirection:'row',
    padding:10,
  },
  text:{
    width:200,
    marginLeft:20,
  },
  name:{
    color:'#47300D',
    fontSize:20,
  },
  comment:{
    fontSize:14,
    color:'#8C8B8B',
    width:180,
  },
  stars:{

  }
})

export default Avis