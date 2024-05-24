import { View, Text,StyleSheet, Button, ImageBackground, TextInput } from 'react-native'
import React from 'react'
// import PhoneInput from 'react-native-phone-number-input';

const Otpcode = ({navigation}) => {
  const image = require("../assets/images/background/third.png");
  return (
    <View style={{}}>
      <ImageBackground source={image} style={{ width:"auto", height:900}} resizeMode="cover">
        <View style={styles.display} >
          <View style={styles.header}>
          <Text style={styles.inscriptionColor}>Connexion</Text>
          {/* <Text style={styles.connexionColor}>Connexion</Text> */}
          </View>
        </View>
        <View style={styles.display}>
          <Text style={styles.p}>Eos suscipit nostrum in temporibus dolores ut natus saepe.</Text>
        </View>
        <View style={styles.display}>
          <View style={styles.input}>
            <TextInput style={styles.inputs} placeholder='OTP CODE'/>
            {/* <TextInput style={styles.inputs}  placeholder='Prénoms'/> */}
            {/* <PhoneInput placeholder='' />             */}
          </View>
          <View style={styles.input}>
            <Button title="SUIVANT" color="#DE9F42" onPress={() => navigation.navigate("Services")} />
          </View>
        </View>
          
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  h1:{
    fontSize: 26,
    fontWeight:"bold",
  },
  inscriptionColor:{
    color: "#FFA012",
    fontSize: 26,
    fontWeight:"bold",
  },
  connexionColor:{
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight:"bold",
  },
  header:{
    marginTop: 150,
    justifyContent:"space-around",
    flexDirection:"row",
    width:290,
    height:30,
  },
  p:{
    width:260,
    height:37,
    textAlign:"center",
    fontSize:16,
    color:"#4E4E4E",
    marginTop:10,
  },
  display:{
    alignItems:"center",
    // height:30,
  },
  input:{
    // borderWidth:1,
    width:330,
    height:50,
    // backgroundColor: "#E5E5E5",
    marginTop: 115,
    borderRadius: 8,
    marginBottom:-80,
  },
  inputs:{
    // borderWidth:1,
    width:330,
    height:50,
    backgroundColor: "#E5E5E5",
    // marginTop: 150,
    // borderRadius: 8,
    // marginBottom:10,
    paddingLeft: 20,
    textAlign: "center"
  }

})


export default Otpcode