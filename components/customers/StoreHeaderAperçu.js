import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import IconeFeather from 'react-native-vector-icons/Feather'
import { TextInput } from 'react-native-paper'
import StoreEdit from './StoreEdit'

const StoreHeaderAperçu = ({navigation}) => {
    const [modif, setModif] = useState(false)

    const handleVisible = () =>{
        setModif(!modif)
    }
  return (
    <View>
      <Image style={styles.image} />
      <View style={styles.bottom}>
        <View style={styles.flex}>
            <Image style={styles.profil} />
            <View styles={styles.text}>
                <Text style={styles.title}>Salon de coiffure</Text>
                <Text style={styles.state}>Ouvert (09:00 - 20:30)</Text>
                <View style={styles.points}>
                    <IconeFeather name='edit' onPress={handleVisible} size={16}/>
                </View>
            </View>
        </View>
        <View style={styles.flex} >
            <Text style={styles.menu} onPress={() => navigation.navigate('Services')} >Service</Text>
            <Text style={styles.cursor} onPress={() => navigation.navigate('Aperçu')}>Aperçu</Text>
            <Text style={styles.menu} onPress={() => navigation.navigate('Avis')}>Avis</Text>
        </View>
      </View>
      <Modal animationType='fade' transparent={true} visible={modif}>
        <View style={styles.background}>
            <StoreEdit navigation={navigation} modif={modif} setModif={setModif}/>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:126,
        backgroundColor:'#ABA9A9'
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
        width:250,
        marginTop:15,
        marginBottom:5,
    },
    flex_input:{
        flexDirection: "row",
        justifyContent:"space-between",
        width:250,
        marginTop:15,
        marginBottom:5,
    },
    bottom:{
        borderBottomWidth: 1,
        borderBlockColor:'#ABA9A9',
    },
    text:{
        marginBottom:50,
    },
    menu:{
        fontSize:16,
    },
    cursor:{
        fontSize:16,
        color:"#DE9F42",
    },
    icone:{
        marginTop:100,
        backgroundColor:'red',
        borderWidth:1,
        borderColor:'red'
    },
    points:{
        flexDirection:'row',
        // borderColor:'#ABA9A9',
        // borderWidth:1,
        // marginTop:5,
        padding:5,
        borderRadius:8,
        // alignContent:'space-between',
        // // width:100,
        // justifyContent:'space-between',
        // height:30
    },
    profil:{
        width:'25%',
        height:'90%',
        backgroundColor:'#ABA9A9',
        borderRadius:8
    },
    profil_input:{
        width:'40%',
        height:'95%',
        borderColor:'#ABA9A9',
        borderRadius:8,
        borderWidth:1
    },
    background:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height:'100%'
    },
    box:{
        width:'80%',
        height:'60%',
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    titre:{
        textAlign:'center',
        fontSize:25
    },
    inputs:{
        width:'90%',
        height:'85%',
        alignItems:'center',
        justifyContent:'center'
    },
    banner:{
        width:'65%',
        height:'100%',
        borderWidth:1,
        borderColor:'grey',
        borderRadius:8
    },
    upload:{
        width:'30%',
        height:'30%',
        backgroundColor:'orange',
        justifyContent:'center',
        alignItems:'center'
    },
    btn:{
        color:'#fff',
        fontSize:14,
    },
    input:{
        borderWidth:1,
        borderColor:'#ABA9A9',
        width:'85%',
        backgroundColor:'#fff',
        height:40
    },
    save:{
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',
        width:'45%',
        height:'30%',
    },
    cancel:{
        backgroundColor:'grey',
        alignItems:'center',
        justifyContent:'center',
        width:'45%',
        height:'30%',
    },
    time:{
        borderWidth:1,
        width:'40%',
        alignItems:'center',
        borderRadius:8,
        borderColor:'grey',
        height:'100%',
    }
})

export default StoreHeaderAperçu