import { View, Text,StyleSheet, Button, ImageBackground, TextInput, TouchableOpacity, Modal, ScrollView, Pressable } from 'react-native'
import React ,{useState} from 'react';
import IndicatorSearch from '../components/customers/indicatorSearch';
// import PhoneInput from 'react-native-phone-number-input';
import { auth, signInWithEmailAndPassword, storage } from '../firebase/configs';
// import auth from '@react-native-firebase/auth'

const Login = ({navigation}) => {
  const image = require("../assets/images/background/third.png");
  const [phone, setPhone] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [code, setCode] = useState('')

  // const sendOtp = async()=>{
  //   try{
  //     const tel = '+225'+ number
  //     const confirmation = await signInWithPhoneNumber(tel);
  //     setConfirm(confirmation) 
  //     console.log(confirmation)
  //     navigation.push('Otpcode')
  //   }catch(error){
  //     console.log('erreur code:', error);
  //   }
  // }

    const signin = async () =>{
      try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log('Message: User connected with success')
        navigation.push('BottomTab', {id: user.uid});
      }catch(error){
        console.log('Message',error)
      }
    }

  // const confirmCode = async() =>{
  //   try{
  //     const userCredential =await confirm.confirm(code);
  //     const user =userCredential.user
  //     const userDocument = await storage().collection('users').doc(user.uid).get()

  //     if (userDocument.exists){
  //       navigation.push('Otpcode')
  //     }else{
  //       navigation.push('UsersDatails', {uid: user.id})
  //     }
  //   }catch(error){
  //     console.log('error code:', error)
  //   }
  // }
  const handleVisible =()=> {
    setPhone(!phone)
  }
  return (
    <View style={{}}>
      <ImageBackground source={image} style={{ width:"auto", height:900}} resizeMode="cover">
        <View style={styles.display} >
          <View style={styles.header}>
          <Text onPress={() => navigation.navigate("Login")} style={styles.connexionColor}>Connexion |</Text>
          <Text onPress={() => navigation.navigate("Signup")} style={styles.inscriptionColor}>Inscription</Text>
          </View>
          <Text style={styles.p}>Veillez renseigner votre numéro téléphonique</Text>
        </View>
        <View style={styles.display}  >
          <View style={styles.input}>
            <TextInput style={styles.phone} value={email} onChangeText={(text)=> setEmail(text)} keyboardType='email-address'  placeholder='Email'/>
            <TextInput style={styles.phone} value={password} onChangeText={(text)=> setPassword(text)}  secureTextEntry={true} placeholder='Mot de passe'/>
            {/* <View style={styles.phone}>
              <TouchableOpacity onPress={handleVisible} style={styles.indicator}><Text style={styles.color}>+225</Text></TouchableOpacity>
              <TextInput style={styles.phone_input} value={number} onChangeText={setNumber} keyboardType='phone-pad'/>
            </View> */}
            <TouchableOpacity onPress={signin} style={styles.buttons}>
              <Pressable ><Text style={styles.textButton}>Se connecter</Text></Pressable>
            </TouchableOpacity>    
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
    color: "#4E4E4E",
    fontSize: 26,
    fontWeight:"bold",
  },
  connexionColor:{
    color: "#FFA012",
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
    backgroundColor: "#fff",
    // marginTop: 150,
    // borderRadius: 8,
    // marginBottom:10,
    paddingLeft: 20,
    textAlign: "center"
  },
  phone:{
    width:'100%',
    height:50,
    backgroundColor:'white',
    flexDirection:'row',
    paddingLeft:'5%',
    // padding:5,
    // justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
    borderWidth:1,
    borderColor:'#ABA9A9',
    marginBottom:'5%'
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
  },
  textButton:{
    color: "#fff",
    fontSize:18
  },
  buttons:{
    backgroundColor: "#DE9F42",
    height:50,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },

})


export default Login