import {StyleSheet, View, Text,Button, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import React from 'react'

const Start = ({navigation}) => {
    const image = require("../assets/images/background/first.png");
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View>
        <ImageBackground source={image} style={{width: "auto", height: '100%'}} resizeMode="cover">
            <View style={{ width: 400, height: 200,borderRadius:150, marginLeft:-80, marginTop: -55 }}></View>
            <View style={{ width:268, height:189,flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center", alignItems:'center', marginTop: -5, borderTopRightRadius: 5060,borderBottomRightRadius: 5060}}>
                <Text style={styles.textStyle}>A CHACUN SON <Text style={styles.text}>MANAWA</Text></Text>
            </View>
            
            <View style={{ width:250, height:200,  borderRadius:50, borderRadius:150, marginLeft:-80, marginTop: -10 }}></View>
            <View style={{ width:200, height:200,  borderRadius:50, borderRadius:150, marginLeft:-80, marginTop: -10 }}></View>
            <View style={{ width: 50, height: 90, borderTopRightRadius:150, marginTop:-10, borderBottomRightRadius:100, marginLeft:-18 }}></View>
            <View style={{width: "auto", height: 53, alignItems: "flex-end", margin: 15, marginTop: -5 }}>
                <Button title="COMMENCEr " color="#DE9F42" onPress={()=> navigation.push("Signup")} />
            </View>
        </ImageBackground>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
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
    }

  });
export default Start