import { View, ScrollView, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/customers/Header';
import { Paniers } from '../data/Paniers';
import Icone from 'react-native-vector-icons/Entypo';
import { DataTable } from 'react-native-paper';

const Home = () => {
    const [modalVisible, setModalVisible] = useState(false); 
    const [ confirm, setConfirm] = useState(false);
    const [ annul, setAnnul] = useState(false);

    return (
        <View>
            <ScrollView>
                <Header />
                <Image style={styles.banner} source={require('../assets/images/Profils/p12.jpg')} />
                <View style={styles.container}>
                    {Paniers.map((data) => (
                        <View style={styles.box} key={data.id}>
                            <Icone name='dots-three-horizontal' onPress={() => setModalVisible(true)} size={16} color="black" style={{ textAlign: "right", width: 150, marginTop: -5, marginRight: -5 }} />
                            <View style={styles.buttonsContainer}>
                                <Image style={styles.images} source={data.image} />
                            </View>
                            <View style={styles.details}>
                                <View>
                                    <Text style={styles.text}><Text style={styles.bold}>Service:</Text> {data.name}</Text>
                                    <Text style={styles.text}><Text style={styles.bold}>Date:</Text> {data.date}</Text>
                                    <Text style={styles.text}><Text style={styles.bold}>Coût:</Text> {data.price}</Text>
                                </View>
                                <View style={styles.buttonsContainer}>
                                    <Pressable style={styles.btn_annulation} onPress={() => setAnnul(true)}><Text style={styles.buttonText}>Annuler</Text></Pressable>
                                    <Pressable style={styles.btn_confirmation} onPress={() => setConfirm(true)}><Text style={styles.buttonText}>Confirmer</Text></Pressable>
                                </View>
                            </View>
                            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible); }}>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Titre</DataTable.Title>
                                        <DataTable.Title>Valeur</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell>Test</DataTable.Cell>
                                        <DataTable.Cell>Valeur test</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                                <Pressable onPress={() => setModalVisible(!modalVisible)}><Text>X</Text></Pressable>
                            </Modal>
                            <Modal transparent={true} style={styles.model} visible={confirm}>
                                <View style={styles.model}>
                                    <Text>Voulez-vous prendre cette taches?</Text><View style={styles.buttonsContainer}>
                                    <Pressable style={styles.btn_annulation} onPress={() =>setConfirm(!confirm)}><Text>Non </Text></Pressable>
                                    <Pressable style={styles.btn_confirmation} onPress={() =>setConfirm(!confirm)}><Text>Oui </Text></Pressable>
                                </View>
                                </View>
                            </Modal>
                            <Modal transparent={true} style={styles.model} visible={confirm}>
                               <View style={styles.model}>
                               <Text>Voulez-vous annuler cette taches?</Text>
                               <View style={styles.buttonsContainer}>
                                <Pressable style={styles.btn_annulation} onPress={() =>setAnnul(!confirm)}><Text>Non </Text></Pressable>
                                <Pressable style={styles.btn_confirmation} onPress={() =>setAnnul(!confirm)}><Text>Oui </Text></Pressable>
                                </View>
                               </View>
                            </Modal>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    box: {
        width: '45%',
        margin: '2.5%',
        borderWidth: 1,
        borderColor: '#ABA9A9',
        padding: 15,
        alignItems: "center",
    },
    images: {
        width: 120,
        height: 120,
        marginBottom: 10,
        borderRadius: 8
    },
    details: {
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        color: "#ABA9A9",
        marginBottom: 5,

    },
    bold: {
        fontWeight: 'bold',
        color: "black"
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
    banner: {
        width: '100%',
        height: 120
    },
    model:{
        width:300,
        height:100,
        backgroundColor:'#fff',
        alignItems: 'center',
        marginTop:350,
        marginLeft:60,
        paddingTop:10,
        shadowColor:'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    }
});

export default Home;
