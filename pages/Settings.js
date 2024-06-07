import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import Header from '../components/customers/Header'
import InfoStoreBare from '../components/customers/InfoStoreBar'
import IconeFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconeFontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconeEntypo from 'react-native-vector-icons/Entypo'
import IconeAntDesign from 'react-native-vector-icons/AntDesign'
import {signOut, auth, db, collection, getDoc, getDocFromCache} from '../firebase/configs'
import { scale } from 'react-native-size-matters'

const Settings = ({navigation}) => {
  const userId = auth.currentUser.uid;
  const [datas, setDatas] = useState({})
  const logout = async() =>{
    try{
      await signOut(auth)
      console.log('Message: User Disconnect successfully')
      navigation.push('Start')
    }catch(error){
      console.log('Erreur Message: ', error)
    }

  }

  // const getInfo = async() =>{
  //   const docRef =  doc(db, 'Store', userId)
  //   try {
  //     const docSnap = await getDocFromCache(docRef)
  //     if (docSnap.exists()) {
  //       setDatas(docSnap.data())
  //       // console.log("Document data:", docSnap.data());
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   }catch(error){

  //   }
  // }

  return (
    <View style={{height:'100%', flex:1}}>
      <Header navigation={navigation}/>
      <InfoStoreBare navigation={navigation}/>
      <View style={styles.stat}>
        <View style={styles.flex}>
          <Text style={styles.line}>Total Prestation: </Text>
          <Text style={styles.lines}>30</Text> 
        </View>
        <View style={styles.flex}>
          <Text style={styles.line}>Total transaction: </Text>
          <Text style={styles.lines}>30</Text> 
        </View>
        <View style={styles.flex}>
          <Text style={styles.line}>Best seller: </Text>
          <Text style={styles.lines}> Coupe d'homme</Text> 
        </View>
        <View style={styles.flex}>
          <Text style={styles.line}>Note Globale: </Text>
          <Text style={styles.lines}><IconeFontAwesome name='star' size={18}color="#DE9F42"/><IconeFontAwesome name='star' size={18}color="#DE9F42"/><IconeFontAwesome name='star' size={18}color="#DE9F42"/><IconeFontAwesome name='star' size={18}color="#DE9F42"/><IconeFontAwesome name='star' size={18}color="#DE9F42"/>  </Text> 
        </View>
      </View>
      <View style={styles.settings}>
        <View style={styles.flex}>
         {/* <Text style={styles.options}><IconeFontAwesome5 name='user-edit' size={24}/> Modifier mon compte</Text> */}
        </View>
        <View style={styles.flex}>
         <Text style={styles.options}><IconeEntypo name="price-ribbon" size={24}/> Bonus et reduction</Text>
        </View>
        <View style={styles.flex}>
        <Text style={styles.options}><IconeAntDesign name='customerservice' size={24}/> Services clients</Text>
        </View>
        <View style={styles.flex}>
          <TouchableOpacity onPress={logout} >
              <Text style={styles.options} ><IconeMaterialCommunityIcons  name='logout' size={24}/> Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles  = StyleSheet.create({
  stat:{
    marginTop:10,
    width:scale(350),
    borderBottomWidth:1,
    borderColor:'#D9D9D9'
  },
  line:{
    margin:10,
    fontSize:scale(16),
    color:'#47300D',
    width:scale(160),
    paddingLeft:10,
  },
  lines:{
    margin:10,
    fontSize:scale(14),
    color:'#8C8B8B',
    width:scale(160),
    textAlign:'right',
    paddingRight:20,
  },
  flex:{
    flexDirection:'row',
  },
  settings:{
    marginTop:10,
    width:scale(350),
  },
  options:{
    margin:10,
    fontSize:20,
    color:'#47300D',
    marginLeft:20
  }
})

export default Settings