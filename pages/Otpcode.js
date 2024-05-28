import { View, Text,StyleSheet, Button, ImageBackground, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { auth, signInWithPhoneNumber, storage } from '../firebase/configs';

const Otpcode = ({navigation}) => {
  const image = require("../assets/images/background/third.png");
  const [code, setCode] = useState('')

  const confirmCode = async() =>{
    try{
      const userCredential =await confirm.confirm(code);
      const user =userCredential.user
      const userDocument = await storage().collection('users').doc(user.uid).get()

      if (userDocument.exists){
        navigation.push('BottomTab', {uid: user.id})
      }else{
        navigation.push('UsersDetails', {uid: user.id})
      }
    }catch(error){
      console.log('error code:', error)
    }
  }
  return (
    <View style={styles.Card}>
    <ImageBackground source={image} style={styles.background} resizeMode="cover">
        <View style={styles.display} >
          <View style={styles.header}>
            <Text style={styles.inscriptionColor}>Connexion</Text>
          </View>
          <Text style={styles.p}>Renseignez le code OTP</Text>
        </View>
        <View style={styles.box_inputs}>
          <View style={styles.input}>
            <TextInput style={styles.inputs} value={code} onChangeText={setCode} keyboardType='phone-pad' placeholder='OTP CODE'/>
            {/* <TextInput style={styles.inputs}  placeholder='Prénoms'/> */}
            {/* <PhoneInput placeholder='' />             */}
          </View>
          <TouchableOpacity onPress={confirmCode} style={styles.input}>
           <Pressable style={styles.buttons}  ><Text style={styles.textButton}>SUIVANT</Text></Pressable>
          </TouchableOpacity>
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
    marginTop:'-60%'
  },
  box_inputs:{
    alignItems:"center",
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
    borderWidth:1,
    width:330,
    height:50,
    backgroundColor: "#fff",
    // marginTop: 150,
    borderRadius: 8,
    // marginBottom:10,
    paddingLeft: 20,
    textAlign: "center",
    borderColor:'#ABA9A9'
  },
  background:{
    width:"100%",
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
  },
  Card:{
    height:'100%',
    width:'100%'
  },
  buttons:{
    backgroundColor: "#DE9F42",
    height:50,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },
  textButton:{
    color: "#fff",
    fontSize:18
  },

})


export default Otpcode