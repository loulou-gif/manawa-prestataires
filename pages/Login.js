import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Modal, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import IndicatorSearch from '../components/customers/indicatorSearch';
import { auth, signInWithEmailAndPassword, db, doc, getDoc } from '../firebase/configs';
import { scale, verticalScale } from 'react-native-size-matters';

const Login = ({ navigation }) => {
  const image = require("../assets/images/background/third.png");
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Message: User connected with success');
      
      const storeRef = doc(db, 'Store', user.uid);
      const storeDoc = await getDoc(storeRef);
      
      navigation.push('BottomTab', { id: user.uid });
     
    } catch (error) {
      console.log('Message', error);
    }
  };

  const handleVisible = () => {
    setPhone(!phone);
  };

  return (
    <View>
      <ImageBackground source={image} style={{ width: scale(350), height: scale(740) }} resizeMode="cover">
        <View style={styles.display}>
          <View style={styles.header}>
            <Text style={styles.connexionColor}>CONNEXION</Text>
          </View>
        </View>
        <View style={styles.display}>
          <View style={styles.input}>
            <TextInput style={styles.phone} value={email} onChangeText={(text) => setEmail(text)} keyboardType='email-address' placeholder='Email' />
            <TextInput style={styles.phone} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Mot de passe' />
            <TouchableOpacity onPress={signin} style={styles.buttons}>
              <Text style={styles.textButton}>Se connecter</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.p}>Pas encore de compte?<Text onPress={() => navigation.navigate("Signup")} style={styles.inscriptionColor}> Inscrivez vous</Text></Text>
            </View>
          </View>
        </View>
        <Modal animationType='fade' transparent={true} visible={phone}>
          <View style={styles.container}>
            <View style={styles.box}>
              <IndicatorSearch />
              <ScrollView style={styles.indicators}>
                <TouchableOpacity onPress={handleVisible} style={styles.indic}><Text>+225 Ivory Coast</Text></TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: scale(26),
    fontWeight: "bold",
  },
  inscriptionColor: {
    color: "#FFA012",
    fontSize: scale(16),
  },
  connexionColor: {
    color: "#FFA012",
    fontSize: scale(26),
    fontWeight: "bold",
  },
  header: {
    marginTop: scale(175),
    alignItems: "center",
    flexDirection: "row",
    width: verticalScale(260),
    height:scale(50),
  },
  p: {
    width: '100%',
    height: scale(37),
    textAlign: "center",
    fontSize: scale(14),
    color: "#4E4E4E",
    marginTop: 10,
  },
  display: {
    alignItems: "center",
    // marginTop:50
  },
  input: { 
    width: scale(300),
    height: scale(50),
    marginTop: scale(50),
    borderRadius: 8,
    marginBottom: scale(-80),
  },
  inputs: {
    width: 330,
    height: 50,
    backgroundColor: "#fff",
    paddingLeft: 20,
    textAlign: "center"
  },
  phone: {
    width: '100%',
    height: scale(50),
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: '5%',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ABA9A9',
    marginBottom: '5%'
  },
  indicator: {
    width: scale(75),
    borderRightWidth: 1,
    height: scale(40),
    borderColor: '#ABA9A9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  phone_input: {
    width: scale(255),
    height: scale(50), 
    paddingLeft: scale(10),
  },
  box: {
    width: '70%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 5
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%'
  },
  indicators: {
    width: '100%',
    height: scale(50),
  },
  indic: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingLeft: 25,
    borderColor: '#ABA9A9',
  },
  color: {
    color: '#ABA9A9'
  },
  textButton: {
    color: "#fff",
    fontSize: scale(18)
  },
  buttons: {
    backgroundColor: "#DE9F42",
    height: scale(50),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
