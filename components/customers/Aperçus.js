import { View, Text , Image, StyleSheet, Modal, Pressable} from 'react-native'
import React, {useState} from 'react'
import IconeFeather from 'react-native-vector-icons/Feather'
import IconeAntDesign from 'react-native-vector-icons/AntDesign'
import { AperçuData } from '../../data/AperçuData'
const Aperçus = ({navigation}) => {
    const [ deleted, setDeleted] = useState(false);
  return (
    <View>
      {AperçuData.map((data) =>(
        <View key={data.id}>
            <View style={styles.box}>
                <Image style={styles.image} source={data.image}/>
                <View style={styles.box_text}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.comment}>{data.commentaire}</Text>
                    <View styles={styles.icone}>
                    <Text><IconeFeather name='edit' onPress={() => navigation.navigate('ModifyAperçu')} size={20} /> <IconeAntDesign name='delete' onPress={() => setDeleted(!deleted)} size={20} color='red'/> </Text>
                    </View>
                </View>
            </View>
            <Modal animationType="fade" transparent={true} style={styles.model} visible={deleted}>
                <View style={styles.model}>
                    <Text >Voulez-vous supprimer ce service?</Text>
                    <View style={styles.buttonsContainer}>
                        <Pressable style={styles.btn_annulation} onPress={() => setDeleted(!deleted)}><Text style={styles.buttonText}>Oui</Text></Pressable>
                        <Pressable style={styles.btn_confirmation} onPress={() => setDeleted(!deleted)}><Text style={styles.buttonText}>Nom</Text></Pressable>
                    </View>
              </View>
            </Modal>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
    box_text:{
        paddingTop:10
    },
    image:{
        width:120,
        height:120,
        borderRadius:8
    },
    name:{
        fontSize:18,
        color:'#47300D'
    },
    comment:{
        color:'#ABA9A9',
        fontSize:14,
        width:230,
    },box:{
        padding:10,
        borderWidth:1,
        borderColor:'#D9D9D9',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    icone:{
        alignItems:'flex-end',
        borderWidth:1,
        width:50
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    btn_annulation: {
        backgroundColor: '#FFA012',
        width: 75,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    btn_confirmation: {
        backgroundColor: '#47300D',
        width: 75,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    buttonText: {
        color: "#fff"
    },
    model:{
        width:300,
        height:100,
        backgroundColor:'#fff',
        alignItems: 'center',
        marginTop:350,
        marginLeft:60,
        paddingTop:10,
    }
})

export default Aperçus