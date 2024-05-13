import { View, Text , Image, StyleSheet, Modal, Pressable, TextInput} from 'react-native'
import React, {useState} from 'react'
import IconeFeather from 'react-native-vector-icons/Feather'
import IconeAntDesign from 'react-native-vector-icons/AntDesign'
import { AperçuData } from '../../data/AperçuData'
import IconeEntypo from 'react-native-vector-icons/Entypo'
import * as ImagePicker from 'expo-image-picker';
import {app, db , collection, addDoc, getFirestore} from '../../firebase/configs'
const Aperçus = ({navigation}) => {
    const [ deleted, setDeleted] = useState(false);
    const [modify, setModify] = useState(false)
    const [details, setDetails] = useState(null)
    const [image, setImage] = useState('')    
    const [photo, setPhoto] = useState('')
    const [client, setClient] = useState('')
    const [comment, setComment] = useState('')

    const handleModalModify =(detail) =>{
        setDetails(detail)
        setModify(!modify)
    }
    const selectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          console.log(result);
        } else {
          alert('Aucune photo sélectionnée.');
        }
      };
      const modifyAperçu = async() =>{
        try {
            const docRef = await addDoc(collection(db, "aperçu"), {
              client: client,
              comment: comment,
              image:photo,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          try {
            const {uri} = await FileSystem.getInfoAsync(photo);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () =>{
                    resolve(xhr.response);
                };
                xhr.onerror =(e) =>{
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });
            const filename= image.substing(image.lastIndexOf('/') +1 );
            const ref = firebase.storage().ref.child(filename);

            await ref.put(blob);
            setUpload(false);
            Alert.alert('photo ploaded');
            setPhoto(null)

      }catch(error) {
        console.error(error)
        setUpload(false)
      }
      }

    const confirmDelete = () => {
        // Implement delete logic here
        // setDeleted(false) should be called after deletion is confirmed
    }
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
                        <Text><IconeFeather name='edit' onPress={()=>handleModalModify(data)} size={20} /> <IconeAntDesign name='delete' onPress={() => setDeleted(!deleted)} size={20} color='red'/> </Text>
                    </View>
                </View>
            </View>
            <Modal  animationType="fade"  transparent={true} visible={modify}>
            {details && 
                <View style={styles.create}>
                    <View style={styles.second_box}>
                        <Text style={styles.titres}>Modifier un Aperçu</Text>
                        <View style={styles.first_inputs}>
                            <View style={styles.box_image}>
                                {photo && <Image style={styles.add_image}/>}
                                <Image style={styles.add_image} source={details.image} />
                                <Pressable style={styles.upload} onPress={selectPhoto}>
                                    <Text style={styles.buttonText}><IconeEntypo name="upload" size={20} />Image</Text>
                                </Pressable>
                            </View>
                            <View style={styles.seconds_input}>
                                <TextInput style={styles.add_name} onChangeText={(text) => setService(text)}  placeholder='Nom du client'><Text>{details.name}</Text></TextInput>
                                {/* <TextInput style={styles.add_cost} placeholder='Avis'>{details.commentaire}</TextInput> */}
                            </View>
                        </View>
                        <View style={styles.add_comments} >
                            <Text style={styles.labelle}>Description du services</Text>
                            <TextInput style={styles.add_comment} multiline={true} onChangeText={(text) => setService(text)}  numberOfLines={4}>{details.commentaire}</TextInput>
                        </View>
                        <View style={styles.buttonsContainer2}>
                            <Pressable onPress={() => handleModalModify()} style={styles.btn_annulation}>
                                <Text style={styles.buttonText}>Annuler</Text>
                            </Pressable>
                            <Pressable onPress={() => modifyAperçu()} style={styles.btn_confirmation}>
                                <Text style={styles.buttonText}>Modifier</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                }
            </Modal>
            <Modal animationType="fade" transparent={true} style={styles.models} visible={deleted}>
                <View style={styles.models}>
                    <View style={styles.model}>
                        <Text >Voulez-vous supprimer ce service?</Text>
                        <View style={styles.buttonsContainer}>
                            <Pressable style={styles.btn_annulation} onPress={() => setDeleted(!deleted)}><Text style={styles.buttonText}>Oui</Text></Pressable>
                            <Pressable style={styles.btn_confirmation} onPress={() => setDeleted(!deleted)}><Text style={styles.buttonText}>Nom</Text></Pressable>
                        </View>
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
        marginLeft:60,
        paddingTop:10,
    },
    models:{
        width:415,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height:900,
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
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

export default Aperçus