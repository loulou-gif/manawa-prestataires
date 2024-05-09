import { View, Text, Pressable, StyleSheet, ScrollView, Modal, TextInput, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import Header from '../components/customers/Header'
// import StoreHeader from '../components/customers/StoreHeader'
import Icone from 'react-native-vector-icons/EvilIcons';
import IconeFeather from 'react-native-vector-icons/Feather';
import IconeEntypo from 'react-native-vector-icons/Entypo'
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Aperçus from '../components/customers/Aperçus';
import StoreHeaderAperçu from '../components/customers/StoreHeaderAperçu';
import * as ImagePicker from 'expo-image-picker';
import {app, db , collection, addDoc, getFirestore} from '../firebase/configs'

// lightbulb-on-outline

const Aperçu = ({navigation}) => {
    const [create, setCreate] = useState(false)
    const [upload, setUpload] = useState(false)    
    const [photo, setPhoto] = useState(null)
    const [client, setClient] = useState('')
    const [comment, setComment] = useState('')

    const handleVisible =() =>{
        setCreate(!create),
        setClient(''),
        setComment('')
    }
    const selectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        //   mediaTypes: ImagePicker.MediaTypeOptions.All,
        //   aspect:(4,3)
        });
    
        if (!result.canceled) {
          setPhoto(result.assets[0].uri)
        } else {
          alert('Aucune photo sélectionnée.');
        }
        const uploadImage = async() =>{
            setUpload(true)
        }
    }
      
    const createAperçu = async () => {
        try {
            const docRef = await addDoc(collection(db, 'aperçu'), {
                client: client,
                comment: comment,
                image: photo
            });
            console.log('Document written with ID: ', docRef.id);
    
            // Handle image upload
            if (photo) {
                const response = await fetch(photo);
                const blob = await response.blob();
    
                const filename = photo.substring(photo.lastIndexOf('/') + 1);
                const ref = firebase.storage().ref().child(filename); // Utilisez firebase.storage()
    
                await ref.put(blob);
                setUpload(false);
                Alert.alert('Photo uploaded');
                setPhoto(null);
            } else {
                setUpload(false);
                Alert.alert('Aucune photo sélectionnée.');
            }
        } catch (error) {
            console.error('Error creating aperçu: ', error);
            setUpload(false);
            // Alert.alert('Erreur lors de la création de l\'aperçu.');
        }
    };
    
  return (
    <View>
        <Header/>
        <StoreHeaderAperçu navigation={navigation}/>
        <ScrollView>
            <View>
                <View style={styles.center}>
                    <View style={styles.def}>
                        <IconeMaterialCommunityIcons style={styles.light} name='lightbulb-on-outline' size={50} color='#fff'/>
                        <Text style={styles.def_text}>Les aperçus peuvent être des témoignages de vos clients, leur recommendations ou des commentaires d'un clients que vous ajoutez à votre mur bien sure avec son concentement</Text>
                    </View>
                </View>
            </View>
            <Pressable onPress={handleVisible} style={styles.button}>
                <Icone name='plus'  size={20} style={{ marginTop:7, color:'#fff', margin:3}} /> 
                <Text style={styles.btn_text}>Ajouter un Aperçu </Text>
            </Pressable>
            <Modal  animationType="fade"  transparent={true} visible={create}>
            <View style={styles.create}>
                <View style={styles.second_box}>
                    <Text style={styles.titres}>Ajouter un service</Text>
                    <View style={styles.first_inputs}>
                        <View style={styles.box_image}>
                             {photo && <Image style={styles.add_image} source={photo}/>}
                            <Pressable style={styles.upload} onPress={selectPhoto}>
                                <Text style={styles.buttonText}><IconeEntypo name="upload" size={20} />Image</Text>
                            </Pressable>
                        </View>
                        <View style={styles.seconds_input}>
                            <TextInput style={styles.add_name} value={client} onChangeText={(text) => setClient(text)} placeholder='Nom du client'  />
                        </View>
                    </View>
                    <View style={styles.add_comments} >
                        <Text style={styles.labelle}>Impression client</Text>
                        <TextInput style={styles.add_comment} multiline={true} numberOfLines={4} value={comment} onChangeText={(text) => setComment(text)} />
                    </View>
                    <View style={styles.buttonsContainer2}>
                        <Pressable onPress={() => handleVisible()} style={styles.btn_annulation}>
                            <Text style={styles.buttonText}>Annuler</Text>
                        </Pressable>
                        <Pressable onPress={() => createAperçu()} style={styles.btn_confirmation}>
                            <Text style={styles.buttonText}>Créer</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
            <Aperçus navigation={navigation}/>
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
    def:{
        backgroundColor:'#7A4D09',
        width:380,
        height:115,
        padding:10,
        borderRadius:8,
        justifyContent:'center',
        flexDirection:'row'
    },
    def_text:{
        color:'#fff',
        width:300,
        fontSize:15
    },
    light:{
        margin:10
    },
    center:{
        alignItems:'center',
        marginTop:15
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
        width:120,
        height:120,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        marginTop:10,
        marginBottom:20,
        borderWidth:1,
        borderColor:'#ABA9A9',
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
    labelle:{
        textAlign:'left',
        marginTop:-20,
        marginBottom:5,
        width:310,
        color:'#ABA9A9'
    },
    box_image:{
        flexDirection:'row',
        width:500
    },
    upload:{
        width:75,
        height:30,
        backgroundColor:'#FFA012',
        margin:8,
        marginTop:50,
        justifyContent:'center',
        alignItems:'center'
    },
    add_image:{
        width:230,
        height:120,
        borderWidth:1,
        borderColor:'#ABA9A9',
        borderRadius:8,
        
    },
})

export default Aperçu