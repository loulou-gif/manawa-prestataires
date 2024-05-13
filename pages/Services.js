import { View, Text, Pressable, Image, StyleSheet, ScrollView, Modal, TextInput, Alert } from 'react-native'
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/customers/Header'
import StoreHeader from '../components/customers/StoreHeader'
import Icone from 'react-native-vector-icons/EvilIcons';
import IconeFeather from 'react-native-vector-icons/Feather'
import IconeAntDesign from 'react-native-vector-icons/AntDesign'
import IconeEntypo from 'react-native-vector-icons/Entypo'
import { Firestore, doc, setDoc } from "firebase/firestore"; 
import {app, db , collection, addDoc, getFirestore} from '../firebase/configs'
import {services} from '../data/services'

const Services = ({navigation}) => {
    const [create, setCreate] = useState(false);
    const [modify, setModify] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [details, setDetails] = useState(null);
    const [service, setService] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleVisible = () => {
        setCreate(!create);
        setCost('');
        setDescription('');
        setImage('');
        setService('');
    }

    const handleModalModify = (detail) => {
        setDetails(detail);
        setModify(!modify);
    }

    const selectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        } else {
          Alert.alert('Aucune photo sélectionnée.');
        }
    };
    const renderSelectedImage = () => {
        if (image) {
            return <Image style={styles.add_image} source={{ uri: image }} />;
        }
        return null;
    };

    const createService = async () => {
        try {
            const imageUrl = image ? image : '';
            const docRef = await addDoc(collection(db, "services"), {
              id_prestataire:'',
              service: service,
              cost: cost,
              description: description,
              image: imageUrl
            });
          
            console.log("Document written with ID: ", docRef.id);
            setCreate(false); // Close modal after creating service
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const confirmDelete = () => {
        // Implement delete logic here
        // setDeleted(false) should be called after deletion is confirmed
    }

    return (
        <ScrollView>
            <Header/>
            <StoreHeader navigation={navigation}/>
            <View contentContainerStyle={{flexGrow:1}}>
                <View>
                    <Pressable onPress={handleVisible} style={styles.button}>
                        <Icone name='plus'  size={20} style={{ marginTop:6, marginLeft:2, color:'#fff'}} />
                        <Text style={styles.btn_text}> Ajouter un service </Text>
                    </Pressable>
                </View>
                <Modal animationType="fade" transparent={true} visible={create}>
                    <View style={styles.create}>
                        <View style={styles.second_box}>
                            <Text style={styles.titres}>Ajouter un service</Text>
                            <View style={styles.first_inputs}>
                                <View style={styles.box_image}>
                                    {image && <Image style={styles.add_image} source={{uri: image}}/>}
                                    <Pressable style={styles.upload}  onPress={selectPhoto}>
                                        <Text style={styles.buttonText}><IconeEntypo name="upload" size={20} />Image</Text>
                                    </Pressable>
                                </View>
                                <View style={styles.seconds_input}>
                                    <TextInput style={styles.add_name} placeholder='Nom du service' onChangeText={(text) => setService(text)} value={service} />
                                    <TextInput style={styles.add_cost} placeholder='Coût' onChangeText={(text) => setCost(text)}  value={cost}/>
                                </View>
                            </View>
                            <View style={styles.add_comments} >
                                <Text style={styles.labelle} >Description du services</Text>
                                <TextInput style={styles.add_comment} multiline={true} onChangeText={(text) => setDescription(text)}  numberOfLines={4} value={description}/>
                            </View>
                            {/* <View style={styles.files} >
                            </View> */}
                            <View style={styles.buttonsContainer2}>
                                <Pressable onPress={handleVisible} style={styles.btn_annulation}>
                                    <Text style={styles.buttonText}>Annuler</Text>
                                </Pressable>
                                <Pressable onPress={createService} style={styles.btn_confirmation}>
                                    <Text style={styles.buttonText}>Créer</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                {services.map((d) =>(
                    <View>
                        <View style={styles.card} key={d.id}>
                    <Image style={styles.image} source={d.image} />
                    <View >
                        <Text style={styles.title}>{d.name}</Text>
                        <Text style={styles.description}>{d.description}</Text>
                    </View>
                    <View>
                        <Text>{d.cost} XOF</Text>
                        <Text>
                            <IconeFeather name='edit' onPress={() => handleModalModify(d)} size={16} />
                            <IconeAntDesign name='delete' onPress={() => setDeleted(!deleted)} size={20} color='red'/>
                        </Text>
                    </View>
                </View>
                <Modal animationType="fade" transparent={true} visible={modify}>
                    {details && 
                        <View style={styles.create}>
                            <View style={styles.second_box}>
                                <Text style={styles.titres}>Modifier un service</Text>
                                <View style={styles.first_inputs}>
                                    <View style={styles.box_image}>
                                        <Image style={styles.add_image} source={details.image}/>
                                        <Pressable style={styles.upload}  onPress={selectPhoto}>
                                            <Text style={styles.buttonText}><IconeEntypo name="upload" size={16} />Image</Text>
                                        </Pressable>
                                    </View>
                                    <View style={styles.seconds_input}>
                                        <TextInput style={styles.add_name} placeholder='Nom du service' onChangeText={(text) => setService(text)} value={details.name}/>
                                        <TextInput style={styles.add_cost} placeholder='Coût' onChangeText={(text) => setCost(text)} value={details.cost} />
                                    </View>
                                </View>
                                <View style={styles.add_comments} >
                                    <Text style={styles.labelle}>Description du services</Text>
                                    <TextInput style={styles.add_comment} multiline={true} numberOfLines={4} placeholder='' onChangeText={(text) => setDescription(text)} value={details.description} />
                                </View>
                                {/* <View style={styles.files} >
                                    
                                </View> */}
                                <View style={styles.buttonsContainer2}>
                                    <Pressable onPress={handleModalModify} style={styles.btn_annulation}>
                                        <Text style={styles.buttonText}>Annuler</Text>
                                    </Pressable>
                                    <Pressable onPress={handleModalModify} style={styles.btn_confirmation}>
                                        <Text style={styles.buttonText}>Modifier</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    }
                </Modal>
                </View>
                ))}
                <Modal animationType="fade" transparent={true} visible={deleted}>
                    <View style={styles.models}>
                        <View style={styles.model}>
                            <Text >Voulez-vous supprimer ce service?</Text>
                            <View style={styles.buttonsContainer}>
                                <Pressable style={styles.btn_annulation} onPress={() => setDeleted(!deleted)}>
                                    <Text style={styles.buttonText}>Non</Text>
                                </Pressable>
                                <Pressable style={styles.btn_confirmation} onPress={()=> confirmDelete}>
                                    <Text style={styles.buttonText}>Oui</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
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
        paddingTop:10,
    },
    add_comments:{
        width:350,
        height:50,
        marginTop:30,
        alignItems:'center'
    },
    add_comment:{
        width:310,
        height:90,
        borderWidth:1,
        borderColor:'#ABA9A9',
        alignItems:'center',
        borderRadius:8,
        paddingLeft:10,
    },
    add_cost:{
        width:300,
        height:40,
        marginTop:10,
        borderBottomWidth:1,
        borderColor:'#ABA9A9',
    },
    add_image:{
        width:230,
        height:80,
        borderWidth:1,
        borderColor:'#ABA9A9',
        borderRadius:8,
    },
    add_name:{
        width:300,
        height:40,
        borderBottomWidth:1,
        borderColor:'#ABA9A9',
        marginTop:10,
    },
    create:{
        alignItems:'center',
        alignContent:'center',
        paddingTop:200,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height:900,
    },
    first_inputs:{
       flexDirection:'column',
       width:350,
       marginLeft:20,
       justifyContent:'center' ,
    },
    seconds_input:{

    },
    second_box:{
        width:350,
        height:430,
        marginTop:-10,
        marginBottom:20,
        paddingTop:20,
        backgroundColor:'#fff'
    },
    buttonsContainer2: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight:20,
        justifyContent:'flex-end',
        marginTop:50,
    },
    titres:{
        fontSize:20,
        color:'#47300D',
        textAlign:'center',
        marginBottom:20
    },
    box_image:{
        flexDirection:'row',
        width:500
    },
    upload:{
        width:80,
        height:30,
        backgroundColor:'#FFA012',
        margin:8,
        justifyContent:'center',
        alignItems:'center',
    },
    models:{
        width:415,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height:900,
        alignItems: 'center',
    },
    labelle:{
        textAlign:'left',
        marginTop:-20,
        marginBottom:5,
        width:310,
        color:'#ABA9A9'
    },
    files:{
        width:'auto',
        marginTop:50,
        marginBottom:-30,
        alignItems:'center'
    }
})

export default Services