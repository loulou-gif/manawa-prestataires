import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/customers/Header'
// import StoreHeader from '../components/customers/StoreHeader'
import StoreHeaderAvis from '../components/customers/StoreHeaderAvis'
import { avis, Iconestyles } from '../data/Avis'

const Avis = ({navigation}) => {
  return (
    <View>
      <Header/>
      <StoreHeaderAvis navigation={navigation}/>
      {avis.map((data) => (
        <View style={styles.card}>
        <View style={styles.circle}>
          <Text style={styles.alias}>JK</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.comment}>{data.commentaire}</Text>
        </View>
        <View style={styles.stars}>
           <Text>{data.icone} </Text>
        </View>
      </View>
      ))}
    </View>
  )
}

const styles= StyleSheet.create({
  circle:{
    backgroundColor:'#7A4D09',
    width:60,
    height:60,
    borderRadius:30,
    alignItems:'center',
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
    fontSize:12,
    color:'#8C8B8B',
    width:200,
    height:50
  },
  stars:{

  },
  alias:{
    color:'white',
    fontSize:18,
    marginTop:15
  }
})

export default Avis