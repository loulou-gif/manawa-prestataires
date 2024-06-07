import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/customers/Header'
// import StoreHeader from '../components/customers/StoreHeader'
import StoreHeaderAvis from '../components/customers/StoreHeaderAvis'
import { avis, Iconestyles } from '../data/Avis'
import { scale, verticalScale } from 'react-native-size-matters'

const Avis = ({navigation}) => {
  const avisWithAlias = avis.map(data => ({
    ...data,
    alias: data.name.split(' ').map(word => word.charAt(0)).join('')
  }));
  return (
    <View style={{flex:1, height:'100%'}}>
      <StoreHeaderAvis navigation={navigation}/>
      <ScrollView >
        {avisWithAlias.map((data) => (
          <View key={data.id} style={styles.card}>
            <View style={styles.circle}>
              <Text style={styles.alias}>{data.alias} </Text>
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
      </ScrollView>
    </View>
  )
}

const styles= StyleSheet.create({
  circle:{
    backgroundColor:'#7A4D09',
    width:scale(50),
    height:verticalScale(45),
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'
  },
  card:{
    borderWidth:1,
    borderColor:'#D9D9D9',
    flexDirection:'row',
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    width:scale(210),
    marginLeft:20,
    // borderWidth:1
  },
  name:{
    color:'#47300D',
    fontSize:scale(16),
  },
  comment:{
    fontSize:12,
    color:'#8C8B8B',
    width:scale(210),
    height:verticalScale(35),
    // borderWidth:1
  },
  stars:{
    // marginTop:10
  },
  alias:{
    color:'white',
    fontSize:scale(14),
    // marginTop:15
  }
})

export default Avis