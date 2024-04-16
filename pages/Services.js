import { View, Text, Pressable, Image, StyleSheet, ScrollView, Modal, TextInput } from 'react-native'
import React, { useState } from 'react';
import Header from '../components/customers/Header'
import StoreHeader from '../components/customers/StoreHeader'
import Icone from 'react-native-vector-icons/EvilIcons';
import IconeFeather from 'react-native-vector-icons/Feather'
import IconeAntDesign from 'react-native-vector-icons/AntDesign'
import IconeEntypo from 'react-native-vector-icons/Entypo'

const Services = ({navigation}) => {
    const [ deleted, setDeleted] = useState(false);
    const [create, setCreate] =useState(false)

    const handleVisible =() =>{
        setCreate(!create)
    }

  return (
    <View>
      <ScrollView>
        <Header/>
        <StoreHeader navigation={navigation}/>
        <View>
            <Pressable onPress={() => handleVisible()} style={styles.button}>
                <Icone name='plus'  size={20} style={{ marginTop:6, marginLeft:2, color:'#fff'}} />
                <Text style={styles.btn_text}> Ajouter un service </Text>
            </Pressable>
        </View>
        {create && 
        <View >
            <Text style={styles.titre}>Ajout de services</Text>
            <View style={styles.card_input}>
                <View style={styles.image_input}></View>
                <View >
                    <TextInput style={styles.title_input} placeholder='Nom du service' />
                    <TextInput style={styles.description_input} placeholder='Description du services'/>
                </View>
                <View>
                    <TextInput style={styles.price_input}  placeholder='Coût'/>
                    <Text style={styles.buttonsContainer}><IconeAntDesign name='checksquare' color='green' size={20} onPress={() => handleVisible()}/>  <IconeEntypo name='circle-with-cross' color='red' size={20} onPress={() => handleVisible()}/></Text>
                </View>
            </View>
                
                {/* <View style={styles.buttonsContainer2}>
                    <Pressable style={styles.btn_annulation} onPress={() => handleVisible()}>
                        <Text style={styles.buttonText}>Ajouter</Text>
                    </Pressable>
                    <Pressable style={styles.btn_confirmation} onPress={() => handleVisible()}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </Pressable>
                </View> */}
        
        </View>
        }
        <View style={styles.modify}>

        </View>
        <View style={styles.card}>
            <Image style={styles.image} />
            <View >
                <Text style={styles.title}>Coupe homme</Text>
                <Text style={styles.description}>Coiffure de tout genre pour homme</Text>
            </View>
            <View>
                <Text>10.000 XOF</Text>
                <Text><IconeFeather name='edit' onPress={() => navigation.navigate('ModifyServices')} size={20} /> <IconeAntDesign name='delete' onPress={() => setDeleted(!deleted)} size={20} color='red'/> </Text>
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
        borderRadius:8,
        flexDirection:'row'
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
    },
    add_comments:{
        width:350,
        height:50,
        marginTop:30,
        alignItems:'center'
    },
    title_input:{
        fontSize:14,
        color:"black",
        width:200,
        borderBottomWidth:1,
        borderColor:'#ABA9A9',
        borderRadius:8,
        paddingLeft:10,
    },
    description_input:{
        fontSize:12,
        color:"#ABA9A9",
        borderBottomWidth:1,
        borderColor:'#ABA9A9',
        width:200,
        borderRadius:8,
        paddingLeft:10,
    },
    price_input:{
        color:'#ABA9A9',
        borderWidth:1,
        borderColor:'#ABA9A9',
        width:80,
        borderRadius:8,
        paddingLeft:10,
    },
    image_input:{
        width:50,
        height:40,
        backgroundColor:'#ABA9A9',
        borderRadius:8,
        marginLeft:9
    },
    card_input:{
        borderWidth:1,
        borderColor:'#ABA9A9',
        flexDirection:"row",
        justifyContent:"space-between",
        padding:10,
        marginBottom:30
    },
    titre:{
        fontSize:20,
        color:'#DE9F42',
        marginBottom:10,
        marginLeft:10
    }
})

export default Services