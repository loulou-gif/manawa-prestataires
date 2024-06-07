import {StyleSheet,View ,Text,Button,ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Start = ({navigation}) => {
    const image = require("../assets/images/background/first.png");
  return (
    <View style={styles.container}>
      <View>
        <ImageBackground source={image} style={{width: "auto", height: scale(740)}} >
            <View style={styles.first}>
              <View style={styles.second}>
                  <Text style={styles.textStyle}>A CHACUN SON <Text style={styles.text}>MANAWA</Text></Text>
              </View>
              <View style={styles.boutton}>
                <TouchableOpacity onPress={()=> navigation.push("Signup")} style={styles.buttons}>
                  <Text style={styles.textButton}>COMMENCER <AntDesign name='arrowright' size={18} /> </Text>
                </TouchableOpacity>  
              </View>
            </View>
        </ImageBackground>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      // padding: 20,
    },
    textStyle:{
        fontSize: scale(20),
        color: "#E5E5E5",
        marginLeft: scale(10),
        // marginTop: scale(100),
        fontWeight:"bold",
    },
    row:{
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    text:{
      fontWeight:"bold",
      fontSize: scale(50)
    },
    first:{
      width: '100%',
      height: scale(730),
      justifyContent:'space-between',
    },
    second:{
      width:scale(250),
      height:scale(200),
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center",
      alignItems:'center',
      marginTop: scale(100),
      // borderWidth:1,
      alignItems:'center' 
    },
    boutton:{
      width: "100%",
      alignItems: "flex-end",
      // margin: 15,
      // borderWidth:1,
      height:scale(50),
      // alignContent:'flex-end',
      // paddingTop:'70%'  
    },
    buttons:{
    backgroundColor: "#DE9F42",
    height:scale(40),
    width:scale(130),
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
    marginRight:scale(10)
  },
  textButton:{
    color: "#fff",
    fontSize:16,
    fontStyle:'italic',
  },

  });
export default Start