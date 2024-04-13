import { View, Text, Pressable, Image, StyleSheet, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react';
import Header from '../components/customers/Header'
import StoreHeader from '../components/customers/StoreHeader'
import Icone from 'react-native-vector-icons/EvilIcons';
import IconeFeather from 'react-native-vector-icons/Feather'
import IconeAntDesign from 'react-native-vector-icons/AntDesign'

const Services = () => {
    const [ deleted, setDeleted] = useState(false);
  return (
    <View>
      <ScrollView>
        <Header/>
        <StoreHeader/>
        <View>
            <Pressable style={styles.button}>
                <Text style={styles.btn_text}><Icone name='plus' size={20} style={{ marginTop:10}} /> Ajouter un service </Text>
            </Pressable>
        </View>
        <View style={styles.card}>
            <Image style={styles.image} />
            <View >
                <Text style={styles.title}>Coupe homme</Text>
                <Text style={styles.description}>Coiffure de tout genre pour homme</Text>
            </View>
            <View>
                <Text>10.000 XOF</Text>
                <Text><IconeFeather name='edit' size={20} /> <IconeAntDesign name='delete' onPress={() => setDeleted(!deleted)} size={20} color='red'/> </Text>
            </View>
        </View>
            <Modal transparent={true} style={styles.model} visible={deleted}>
                <View style={styles.model}>
                    <Text >Voulez-vous supprimer ce service?</Text>
                    <View style={styles.buttonsContainer}>
                        <Pressable style={styles.btn_annulation} onPress={() => setDeleted(!deleted)}><Text style={styles.buttonText}>Oui</Text></Pressable>
                        <Pressable style={styles.btn_confirmation} onPress={() => setDeleted(!deleted)}><Text style={styles.buttonText}>Nom</Text></Pressable>
                    </View>
              </View>
            </Modal>
      </ScrollView>
      
    </View>
  )
}

const styles= StyleSheet.create({
    card:{
        borderWidth:1,
        borderColor:'#ABA9A9',
        flexDirection:"row",
        justifyContent:"space-between",
        padding:10,
    },
    button:{
        backgroundColor:"#DE9F42",
        marginLeft:9,
        width:150,
        height:30,
        margin:10,
        borderRadius:8
    },
    btn_text:{
        color:'#fff', 
        fontSize:14,
        textAlign:"center",
        marginTop:4,       
    },
    title:{
        fontSize:14,
        color:"black",
        width:150
    },
    description:{
        fontSize:12,
        color:"#ABA9A9",
    },
    price:{
        color:'black',
    },
    image:{
        width:50,
        height:40,
        backgroundColor:'#ABA9A9',
        borderRadius:8,
        marginLeft:9
    },
    flex:{
        flexDirection:"row",
        justifyContent:"space-between"
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

export default Services