import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { services } from '../../data/services'

const Services = () => {
  return (
    <View>
      <View style={styles.center} >
        {services.map((data) =>(
          <ImageBackground key={data.id}  style={styles.Card} source={data.image}>
              <View style={styles.titleBox}>
                  <Text  style={styles.title} >{data.name}</Text>
              </View>
          </ImageBackground>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Card:{
    width:300,
    height:150,
    borderRadius:8,
    shadowColor:"black",
    boxShadow:20,
    // backgroundColor:'black',
    resizeMode:"cover",
    marginTop:20,
    // alignContent:"center",
    // justifyContent:"center"
  },
  center:{
    alignItems:"center",
  },
  title:{
    fontSize:20,
    color:"#fff",
    marginLeft: 10
  },
  titleBox:{
    justifyContent:"center",
    backgroundColor:"#F3F3F3",
    opacity: 0.6,
    width:300,
    height:40,
    marginTop:110,
    borderBottomEndRadius:8

  }
})

export default Services