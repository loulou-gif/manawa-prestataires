import { View, Text, Image, StyleSheet } from 'react-native'
import React, {useEffect, useState}  from 'react'
import IconeFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconeFeather from 'react-native-vector-icons/Feather'
import {signOut, doc, auth, db, collection, getDoc, getDocFromCache} from '../../firebase/configs'

const InfoStoreBare = ({navigation}) => {
    const userId = auth.currentUser.uid;
    const [datas, setDatas] = useState({})
    const getInfo = async() =>{
        const docRef =  doc(db, 'Store', userId)
        try {
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setDatas(docSnap.data())
            console.log("Document data:", docSnap.data());
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        }catch(error){
            console.log('Message: ', error)
        }
      }
      useEffect(() => {
        getInfo();
      }, [userId]);

      const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };
  return (
    <View>
      <View style={styles.bottom}>
        <View style={styles.flex}>
            {datas.logoUri ? 
                (<Image style={styles.profil} source={{uri: datas.logoUri}}/>)  :
                (<Image style={styles.profil}  />)  
            }
            <View styles={styles.text}>
                <Text style={styles.title}>{datas.name ? datas.name: 'Nom de la boutique'} </Text>
                <Text style={styles.state}>
                    Ouvert ({datas.openingTime ? formatTime(datas.openingTime) : '09:00'} - {datas.closingTime ? formatTime(datas.closingTime) : '20:30'})
                </Text>
                <View style={styles.icone}>
                    <IconeFeather name='edit' onPress={() => navigation.push('ModifyStore')} size={16}/>
                </View>
            </View>
            <View style={styles.points}>
                {/* <IconeFontAwesome name='money' color="green" size={18}/>  
                <Text>35 pts</Text> */}
            </View>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    image:{
        width:500,
        height:120
    },
    state:{
        color:"green",
        fontSize:12,
    },
    title:{
        fontSize:20,
    },
    flex:{
        flexDirection: "row",
        justifyContent:"space-evenly",
        width:400,
        marginTop:15,
        marginBottom:5,
    },
    bottom:{
        borderBottomWidth: 1,
        borderBlockColor:'#ABA9A9',
        paddingBottom:20
    },
    text:{
        marginBottom:50,
        borderWidth:1,
        width:'75%',
        borderColo:'red'
    },
    menu:{
        fontSize:16,
    },
    cursor:{
        fontSize:16,
        color:"#DE9F42",
    },
    icone:{
        marginTop:10,
        // borderWidth:1,
        // flexDirection:'row'
    },
    points:{
        flexDirection:'row',
        borderColor:'#ABA9A9',
        // borderWidth:1,
        marginTop:5,
        padding:5,
        borderRadius:8,
        alignContent:'space-between',
        width:100,
        justifyContent:'space-between',
        height:30
    },
    profil:{
        width:'20%',
        height:70,
        backgroundColor:'#ABA9A9',
        borderRadius:8
    },    
})

export default InfoStoreBare