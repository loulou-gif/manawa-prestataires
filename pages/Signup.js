// Signup.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, TextInput, Pressable, TouchableOpacity, Modal, ScrollView } from 'react-native';
import IndicatorSearch from '../components/customers/indicatorSearch.js';
import {app, analytics, auth, RecaptchaVerifier} from '../firebase/configs.js'

const Signup = ({navigation}) => {
  const image = require("../assets/images/background/second.png");
  const [phone, setPhone] = useState(false)
  const handleVisible =()=> {
    setPhone(!phone)
  }
  return (
    <View style={{}}>
      <ImageBackground source={image} style={{ width:"auto", height:'100%'}} resizeMode="cover">
        <View style={styles.display} >
          <View style={styles.header}>
            <Text onPress={() => navigation.navigate("Signup")} style={styles.inscriptionColor}>Inscription |</Text><Text onPress={() => navigation.navigate("Login")} style={styles.connexionColor}>Connexion</Text>
          </View>
        </View>
        <View style={styles.display}>
          <Text style={styles.p}>Veillez renseigner le formulaire ci-dessous.</Text>
        </View>
        <View style={styles.display}  >
          <View style={styles.input}>
            <TextInput style={styles.inputs} placeholder='Nom de famille'/>
            <TextInput style={styles.inputs}  placeholder='Prénoms'/>
            {/* <PhoneInput placeholder='' />             */}
            <View style={styles.phone}>
              <TouchableOpacity onPress={handleVisible} style={styles.indicator}><Text style={styles.color}>+225</Text></TouchableOpacity>
              <TextInput style={styles.phone_input} keyboardType='phone-pad'/>
            </View>
          </View>
          <View style={styles.button}>
            {/* <Button title="SUIVANT" color="#DE9F42" onPress={() => navigation.navigate("Otpconnexion")} /> */}
            <Pressable style={styles.buttons} onPress={() => navigation.navigate("Otpcode")}><Text style={styles.textButton}>SUIVANT</Text></Pressable>
          </View>
        </View>
        <Modal animationType='fade' transparent={true} visible={phone}>
            <View style={styles.container}>
              <View style={styles.box}>
                  <IndicatorSearch/>
                  <ScrollView style={styles.indicators}>
                      <TouchableOpacity onPress={handleVisible} style={styles.indic}><Text >+225 Ivory Coast</Text></TouchableOpacity>
                  </ScrollView>
              </View>
            </View>
        </Modal>
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
    width:272,
    height:37,
    textAlign:"center",
    fontSize:16,
    color:"#E5E5E5",
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
    marginTop: 130,
    borderRadius: 8,
    marginBottom:10,
  },
  inputs:{
    // borderWidth:1,
    width:330,
    height:50,
    backgroundColor: "#fff",
    // marginTop: 150,
    borderRadius: 8,
    marginBottom:10,
    paddingLeft: 20,
    marginBottom: 20
  },
  button:{
    // borderWidth:1,
    width:330,
    height:50,
    // backgroundColor: "#E5E5E5",
    marginTop: 160,
    borderRadius: 8,
    marginBottom:10,
  },
  textButton:{
    textAlign:"center",
    color: "#fff",
    alignItems:"center",
    alignContent:"center",
    flex:1,
    justifyContent:"center",
    margin:15
  },
  buttons:{
    backgroundColor: "#DE9F42",
    height:50
  },
  phone:{
    width:330,
    height:50,
    backgroundColor:'white',
    flexDirection:'row',
    // padding:5,
    // justifyContent:'center',
    alignItems:'center',
    borderRadius:8
  },
  indicator:{
    width:75,
    borderRightWidth:1,
    height:40,
    borderColor:'#ABA9A9',
    justifyContent:'center',
    alignItems:'center'
  },
  phone_input:{
    width:255,
    height:50,
    // borderWidth:1,
    paddingLeft:10,
  },
  box:{
    width:'70%',
    height:'50%',
    backgroundColor:'white',
    borderRadius:5
  },
  container:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    height:'100%'
  },
  indicators:{
    width:'100%',
    height:50,
    // borderWidth:1,
  },
  indic:{
    width:'100%',
    height:50,
    borderBottomWidth:1,
    justifyContent:'center',
    paddingLeft:25,
    borderColor:'#ABA9A9',
  },
  color:{
    color:'#ABA9A9'
  }
})

export default Signup;
