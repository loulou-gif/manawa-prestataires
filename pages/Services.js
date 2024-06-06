import { View, Text, Pressable, Image, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/customers/Header';
import StoreHeader from '../components/customers/StoreHeader';
import Icone from 'react-native-vector-icons/EvilIcons';
import IconeFeather from 'react-native-vector-icons/Feather';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';
import IconeEntypo from 'react-native-vector-icons/Entypo';
import { app, db, collection, updateDoc, addDoc, query, getDocs, where, auth, doc, deleteDoc } from '../firebase/configs';
import Message from '../components/customers/Message';
import { scale, verticalScale } from 'react-native-size-matters';

const Services = ({ navigation }) => {
    const [create, setCreate] = useState(false);
    const [modify, setModify] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [details, setDetails] = useState(null);
    const [service, setService] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [servicesData, setServicesData] = useState([]);

    const handleVisible = () => {
        setCreate(!create);
        setCost('');
        setDescription('');
        setImage('');
        setService('');
        setDetails(null);
    }

    const handleModalModify = (detail) => {
        setDetails(detail);
        setService(detail.service);
        setCost(detail.cost);
        setDescription(detail.description);
        setImage(detail.image);
        setModify(!modify);
    }

    const selectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            const source = result.assets[0].uri;
            setImage(source);
        }
    };

    const createService = async () => {
        try {
            const userId = auth.currentUser.uid;
            await addDoc(collection(db, "services"), {
                id_prestataire: userId,
                service: service,
                cost: cost,
                description: description,
                image: image
            });
            setCreate(false);
            printData();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    const getServices = async () => {
        const userId = auth.currentUser.uid;
        const q = query(collection(db, 'services'), where('id_prestataire', '==', userId));
        try {
            const querySnapshot = await getDocs(q);
            const services = [];
            querySnapshot.forEach((doc) => {
                const { service, cost, description, image } = doc.data();
                const limitLength = description.length > 50 ? description.substring(0, 50) + '...' : description;
                services.push({ id: doc.id, service, cost, description: limitLength, image });
            });
            return services;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const printData = async () => {
        const services = await getServices();
        setServicesData(services);
    }

    useEffect(() => {
        printData();
    }, []);

    const modifyService = async () => {
        try {
            const serviceDoc = doc(db, 'services', details.id);
            await updateDoc(serviceDoc, {
                service: service,
                cost: cost,
                description: description,
                image: image
            });
            setModify(false);
            printData();
        } catch (error) {
            console.log('Le message: ', error);
        }
    }

    const confirmDelete = async () => {
        try {
            await deleteDoc(doc(db, 'services', details.id));
            setDeleted(false);
            printData();
        } catch (error) {
            console.log('Message:', error);
        }
    }

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <Header />
            <StoreHeader navigation={navigation} />
            <Pressable onPress={handleVisible} style={styles.button}>
                <Icone name='plus' size={20} style={{ marginTop: verticalScale(6), marginLeft: scale(6), color: '#fff' }} />
                <Text style={styles.btn_text}> Ajouter un service </Text>
            </Pressable>
            <Modal animationType="fade" transparent={true} visible={create}>
                <View style={styles.create}>
                    <View style={styles.second_box}>
                        <Text style={styles.titres}>Ajouter un service</Text>
                        <View style={styles.first_inputs}>
                            <View style={styles.box_image}>
                                {image ? (<Image style={styles.add_image} source={{ uri: image }} />) :(<Image style={styles.add_image} />)}
                                <Pressable style={styles.upload} onPress={selectPhoto}>
                                    <Text style={styles.buttonText}><IconeEntypo name="upload" size={20} />Image</Text>
                                </Pressable>
                            </View>
                            <View style={styles.seconds_input}>
                                <TextInput style={styles.add_name} placeholder='Nom du service' onChangeText={(text) => setService(text)} value={service} />
                                <TextInput style={styles.add_cost} placeholder='Coût' keyboardType='phone-pad' onChangeText={(text) => setCost(text)} value={cost} />
                            </View>
                        </View>
                        <View style={styles.add_comments}>
                            <Text style={styles.labelle}>Description du service</Text>
                            <TextInput style={styles.add_description} multiline={true} onChangeText={(text) => setDescription(text)} numberOfLines={4} value={description} />
                        </View>
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
            <ScrollView contentContainerStyle={styles.scrollView}>
                {servicesData.map((d) => (
                    <View key={d.id}>
                        <View style={styles.card}>
                            <Image style={styles.image} source={{ uri: d.image }} />
                            <View style={styles.add_comment}>
                                <Text style={styles.title}>{d.service}</Text>
                                <Text style={styles.description}>{d.description}</Text>
                            </View>
                            <View>
                                <Text>{d.cost} XOF</Text>
                                <View style={styles.icone}>
                                    <TouchableOpacity>
                                        <IconeAntDesign name='delete' onPress={() => {
                                            setDetails(d); // Set the details of the item to be deleted
                                            setDeleted(true);
                                        }} size={20} color='red' />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <IconeFeather name='edit' onPress={() => handleModalModify(d)} color='orange' size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {modify && details && details.id === d.id && 
                            <Modal animationType='fade' transparent={true} visible={modify}>
                                <View style={styles.create}>
                                    <View style={styles.second_box}>
                                        <Text style={styles.titres}>Modifier le service</Text>
                                        <View style={styles.first_inputs}>
                                            <View style={styles.box_image}>
                                                {image ? (<Image style={styles.add_image} source={{ uri: image }} />) : (<Image style={styles.add_image} />)}
                                                <Pressable style={styles.upload} onPress={selectPhoto}>
                                                    <Text style={styles.buttonText}><IconeEntypo name="upload" size={20} />Image</Text>
                                                </Pressable>
                                            </View>
                                            <View style={styles.seconds_input}>
                                                <TextInput style={styles.add_name} placeholder='Nom du service' onChangeText={(text) => setService(text)} value={service} />
                                                <TextInput style={styles.add_cost} placeholder='Coût' keyboardType='phone-pad' onChangeText={(text) => setCost(text)} value={cost} />
                                            </View>
                                        </View>
                                        <View style={styles.add_comments}>
                                            <Text style={styles.labelle}>Description du service</Text>
                                            <TextInput style={styles.add_description} multiline={true} onChangeText={(text) => setDescription(text)} numberOfLines={4} value={description} />
                                        </View>
                                        <View style={styles.buttonsContainer2}>
                                            <Pressable onPress={() => setModify(!modify)} style={styles.btn_annulation}>
                                                <Text style={styles.buttonText}>Annuler</Text>
                                            </Pressable>
                                            <Pressable onPress={modifyService} style={styles.btn_confirmation}>
                                                <Text style={styles.buttonText}>Modifier</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        }
                    </View>
                ))}
            </ScrollView>
            <Message navigation={navigation} />
            <Modal animationType="fade" transparent={true} visible={deleted}>
                <View style={styles.models}>
                    <View style={styles.model}>
                        <Text>Voulez-vous supprimer ce service?</Text>
                        <View style={styles.buttonsContainer}>
                            <Pressable style={styles.btn_annulation} onPress={() => setDeleted(false)}>
                                <Text style={styles.buttonText}>Non</Text>
                            </Pressable>
                            <Pressable style={styles.btn_confirmation} onPress={confirmDelete}>
                                <Text style={styles.buttonText}>Oui</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        paddingBottom: 20
    },
    card: {
        borderBottomWidth: 1,
        borderColor: '#ABA9A9',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
    },
    button: {
        backgroundColor: "#DE9F42",
        marginLeft: 9,
        width: scale(140),
        height: 30,
        margin: 10,
        borderRadius: 8,
        flexDirection: 'row'
    },
    btn_text: {
        color: '#fff',
        fontSize: 14,
        textAlign: "center",
        marginTop: 4,
    },
    title: {
        fontSize: scale(12),
        color: "black",
        width: scale(150),
    },
    description: {
        fontSize: scale(10),
        color: "#ABA9A9",
    },
    price: {
        color: 'black',
    },
    image: {
        width: scale(60),
        height: verticalScale(45),
        backgroundColor: '#ABA9A9',
        borderRadius: 8,
        marginLeft: 9
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-between"
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
    model: {
        width: 300,
        height: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 10,
    },
    add_comments: {
        width: scale(200),
        height: verticalScale(40),
        marginTop: verticalScale(20),
        marginLeft: scale(20)
    },
    add_comment: {
        width: scale(180),
        height: verticalScale(50),
        // marginLeft: -20,
        alignItems:'flex-start',
        // borderWidth:1
    },
    add_description: {
        width: 310,
        borderWidth: 1,
        borderColor: '#ABA9A9',
        alignItems: 'center',
        borderRadius: 8,
        paddingLeft: 10,
    },
    add_cost: {
        width: scale(255),
        height: verticalScale(35),
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#ABA9A9',
        paddingLeft:10,
    },
    add_image: {
        width: scale(190),
        height: verticalScale(100),
        borderWidth: 1,
        borderColor: '#ABA9A9',
        borderRadius: 8,
    },
    add_name: {
        width: scale(255),
        height: verticalScale(35),
        borderBottomWidth: 1,
        borderColor: '#ABA9A9',
        marginTop: 10,
        paddingLeft:10,
    },
    create: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height: '100%',
    },
    first_inputs: {
        flexDirection: 'column',
        width: scale(350),
        marginLeft: 20,
        justifyContent: 'center',
    },
    seconds_input: {},
    second_box: {
        width: scale(300),
        height: verticalScale(350),
        marginTop: -10,
        marginBottom: 20,
        paddingTop: 20,
        backgroundColor: '#fff'
    },
    buttonsContainer2: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 20,
        justifyContent: 'flex-end',
    },
    titres: {
        fontSize: verticalScale(20),
        color: '#47300D',
        textAlign: 'center',
        marginBottom: 20
    },
    box_image: {
        flexDirection: 'row',
        width: scale(280),
        alignItems:'flex-end',
        // borderWidth:1
        // justifyContent:'flex-end'
    },
    upload: {
        width: scale(65),
        height: 30,
        backgroundColor: '#FFA012',
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    models: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: '100%',
        alignItems: 'center',
    },
    labelle: {
        textAlign: 'left',
        marginTop: -20,
        marginBottom: 5,
        width: scale(310),
        color: '#ABA9A9'
    },
    files: {
        width: 'auto',
        marginTop: 50,
        marginBottom: -30,
        alignItems: 'center'
    },
    icone:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    }
});

export default Services;
