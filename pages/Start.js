import {StyleSheet,View ,Text,Button,ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import React from 'react'

const Start = ({navigation}) => {
    const image = require("../assets/images/background/first.png");
  return (
    <View style={styles.container}>
      <View>
        <ImageBackground source={image} style={{width: "auto",height: '100%'}} resizeMode="cover">
            <View style={styles.first}>
              <View style={styles.second}>
                  <Text style={styles.textStyle}>A CHACUN SON <Text style={styles.text}>MANAWA</Text></Text>
              </View>
              <View style={styles.boutton}>
                <TouchableOpacity onPress={()=> navigation.push("Signup")} style={styles.buttons}>
                  <Text style={styles.textButton}>COMMENCER</Text>
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
        fontSize: 20,
        color: "#E5E5E5",
        marginLeft: 10,
        marginTop: 100,
        fontWeight:"bold",
    },
    row:{
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    text:{
      fontWeight:"bold",
      fontSize: 50
    },
    first:{
      width: '100%',
      height: '100%',
      borderRadius:150,
      // borderWidth:1 ,
      justifyContent:'center',
    },
    second:{
      width:"65%",
      height:'40%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center",
      alignItems:'center',
      marginTop: '40%',
      // borderWidth:1 
    },
    // third:{
    //   height:200,
    //    borderRadius:50,
    //   borderRadius:150,
    //   marginLeft:-80,
    //   marginTop: -10,
    //    width:250
    // },
    fourth:{
      height:200,
       borderRadius:50,
      borderRadius:150,
      marginLeft:-80,
      marginTop: -10,
       width:200
    },
    fith:{
      width: 50,
      height: 90,
      borderTopRightRadius:150,
      marginTop:-10,
      borderBottomRightRadius:100,
      marginLeft:-18 
    },
    boutton:{
      width: "100%",
      alignItems: "flex-end",
      margin: 15,
      // borderWidth:1,
      height:'40%',
      alignContent:'flex-end',
      paddingTop:'70%'  
    },
    buttons:{
    backgroundColor: "#DE9F42",
    height:'75%',
    width:'40%',
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },
  textButton:{
    color: "#fff",
    fontSize:16,
    fontStyle:'italic',
  },

  });
export default Start