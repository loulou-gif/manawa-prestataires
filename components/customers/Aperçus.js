import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import IconeFeather from 'react-native-vector-icons/Feather';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';
import IconeEntypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import { app, db, collection, addDoc, getDocs, query, where, auth, deleteDoc, doc, updateDoc } from '../../firebase/configs';
import { scale, verticalScale } from 'react-native-size-matters';

const Aperçus = ({ navigation }) => {
    const [deleted, setDeleted] = useState(false);
    const [modify, setModify] = useState(false);
    const [details, setDetails] = useState(null);
    const [photo, setPhoto] = useState('');
    const [client, setClient] = useState('');
    const [comment, setComment] = useState('');
    const [apercuData, setApercuData] = useState([]);

    const confirmDelete = async () => {
        if (!details) return;

        try {
            await deleteDoc(doc(db, 'aperçu', details.id));
            setDeleted(false);
            printData();
        } catch (error) {
            console.error('Message:', error);
        }
    };

    const handleModalModify = (detail) => {
        setDetails(detail);
        setClient(detail.client);
        setComment(detail.comment);
        setPhoto(detail.imageUrl);
        setModify(true);
    };

    const selectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setPhoto(result.uri);
        } else {
            Alert.alert('Aucune photo sélectionnée.');
        }
    };

    const modifyAperçu = async () => {
        if (!client || !comment) {
            Alert.alert('Veuillez remplir tous les champs.');
            return;
        }

        const updatedPhoto = photo ? photo : details.imageUrl; // Utiliser l'image actuelle si aucune nouvelle image n'est sélectionnée

        try {
            const userId = auth.currentUser.uid;
            await updateDoc(doc(db, 'aperçu', details.id), {
                id_prestataire: userId,
                client: client,
                comment: comment,
                image: updatedPhoto,
            });

            setDetails(null);
            setClient('');
            setComment('');
            setPhoto('');
            setModify(false);
            printData();
        } catch (e) {
            console.error('Error updating document: ', e);
        }
    };

    const printData = async () => {
        const userId = auth.currentUser.uid;
        const q = query(collection(db, 'aperçu'), where('id_prestataire', '==', userId));
        try {
            const querySnapshot = await getDocs(q);
            const apercu = [];
            querySnapshot.forEach((doc) => {
                const { client, comment, image } = doc.data();
                apercu.push({ id: doc.id, client, comment, imageUrl: image });
            });
            setApercuData(apercu);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        printData();
    }, []);

    return (
        <ScrollView>
            {apercuData.map((data) => (
                <View key={data.id} style={styles.box}>
                    <Image style={styles.image} source={{ uri: data.imageUrl }} />
                    <View style={styles.box_text}>
                        <Text style={styles.name}>{data.client}</Text>
                        <Text style={styles.comment}>{data.comment}</Text>
                        <View style={styles.icone}>
                            <IconeFeather name="edit" onPress={() => handleModalModify(data)} size={20} />
                            <IconeAntDesign name="delete" onPress={() => { setDetails(data); setDeleted(true); }} size={20} color="red" />
                        </View>
                    </View>
                </View>
            ))}

            {modify && details && (
                <Modal animationType="fade" transparent={true} visible={modify}>
                    <View style={styles.create}>
                        <View style={styles.second_box}>
                            <Text style={styles.titres}>Modifier un Aperçu</Text>
                            <View style={styles.first_inputs}>
                                <View style={styles.box_image}>
                                    <Image style={styles.add_image} source={{ uri: photo ? photo : details.imageUrl }} />
                                    <Pressable style={styles.upload} onPress={selectPhoto}>
                                        <Text style={styles.buttonText}>
                                            <IconeEntypo name="upload" size={20} /> Image
                                        </Text>
                                    </Pressable>
                                </View>
                                <View style={styles.seconds_input}>
                                    <TextInput
                                        style={styles.add_name}
                                        onChangeText={(text) => setClient(text)}
                                        placeholder="Nom du client"
                                        value={client}
                                    />
                                </View>
                            </View>
                            <View style={styles.add_comments}>
                                <Text style={styles.labelle}>Description du service</Text>
                                <TextInput
                                    style={styles.add_comment}
                                    multiline={true}
                                    onChangeText={(text) => setComment(text)}
                                    placeholder="Commentaire"
                                    value={comment}
                                />
                            </View>
                            <View style={styles.buttonsContainer2}>
                                <Pressable onPress={() => setModify(false)} style={styles.btn_annulation}>
                                    <Text style={styles.buttonText}>Annuler</Text>
                                </Pressable>
                                <Pressable onPress={modifyAperçu} style={styles.btn_confirmation}>
                                    <Text style={styles.buttonText}>Modifier</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {deleted && (
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
            )}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    box_text: {
        paddingTop: 10,
    },
    image: {
        width: scale(80),
        height: verticalScale(80),
        borderRadius: 8,
    },
    name: {
        fontSize: scale(16),
        color: '#47300D',
    },
    comment: {
        color: '#ABA9A9',
        fontSize: scale(12),
        width: scale(200),
    },
    box: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icone: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: scale(50),
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    btn_annulation: {
        backgroundColor: '#FFA012',
        width: scale(75),
        height: verticalScale(25),
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    btn_confirmation: {
        backgroundColor: '#47300D',
        width: scale(75),
        height: verticalScale(25),
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    buttonText: {
        color: '#fff',
    },
    model: {
        width: scale(300),
        height: verticalScale(100),
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 10,
    },
    models: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: '100%',
        alignItems:'center',
    },
    add_comments: {
        width: scale(300),
        height: 50,
        marginTop: 30,
        alignItems: 'center',
    },
    add_comment: {
        width: scale(290),
        height: verticalScale(50),
        borderWidth: 1,
        borderColor: '#ABA9A9',
        borderRadius: 8,
        paddingLeft: 10,
        marginLeft:30
    },
    add_image: {
        width: scale(200),
        height: verticalScale(100),
        borderWidth: 1,
        borderColor: '#ABA9A9',
        borderRadius: 8,
    },
    add_name: {
        width: scale(280),
        height: verticalScale(35),
        borderBottomWidth: 1,
        borderColor: '#ABA9A9',
        marginTop: 10,
    },
    create: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: '100%',
        justifyContent:'center'
    },
    first_inputs: {
        flexDirection: 'column',
        width: scale(320),
        justifyContent: 'center',
        // borderWidth: 1,
    },
    seconds_input: {
        justifyContent:'center',
        alignItems:'center'
    },
    second_box: {
        width: scale(320),
        height: verticalScale(350),
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ABA9A9',
        paddingTop: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
    },
    buttonsContainer2: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 50,
    },
    titres: {
        fontSize: 20,
        color: '#47300D',
        textAlign: 'center',
        marginBottom: 20,
    },
    labelle: {
        textAlign: 'left',
        marginTop: -20,
        marginBottom: 5,
        width: scale(265),
        color: '#ABA9A9',
    },
    box_image: {
        flexDirection: 'row',
        width: '100%',
        alignItems:'flex-end',
        justifyContent:'center'
    },
    upload: {
        width: scale(70),
        height: verticalScale(25),
        backgroundColor: '#FFA012',
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Aperçus;
