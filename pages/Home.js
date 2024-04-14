import { View, ScrollView, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/customers/Header';
import { Paniers } from '../data/Paniers';
import Icone from 'react-native-vector-icons/Entypo';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';
import IconeFontAwesome from 'react-native-vector-icons/FontAwesome';
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
                            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible); }}>
                                <View style={styles.model_info}>
                                 <Pressable   onPress={() => setModalVisible(!modalVisible)}><Text style={{marginRight:10, marginTop:10, textAlign:'right'}}><IconeAntDesign name='closecircleo' size={26}/></Text></Pressable>
                                 <View style={styles.box_info}>
                                    <View style={styles.circle}>
                                        <Text style={styles.circle_text}>JK</Text>
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={styles.name}>Julius Konan</Text>
                                        <Text style={styles.id}>IDclient:  52314</Text>
                                        <Text style={styles.contact}>Contact:  07 98 395 774</Text>
                                    </View>
                                    <View style={{ marginRight:10}}>
                                         <IconeFontAwesome size={26} name='download'/>
                                    </View>
                                 </View>
                                    <DataTable style={styles.table}>
                                        <DataTable.Header style={styles.table_title}>
                                            <DataTable.Title style={styles.table_text_title}><Text style={styles.table_text_title}>Titre</Text></DataTable.Title>
                                            <DataTable.Title style={styles.table_text_title}><Text style={styles.table_text_title}>Valeur</Text></DataTable.Title>
                                        </DataTable.Header>
                                        <DataTable.Row >
                                            <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Text</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Valer test</Text></DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row style={styles.row_table}>
                                            <DataTable.Cell style={styles.text_row}><Text style={styles.second_text_row}>Text</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.text_row}><Text style={styles.second_text_row}>valer test</Text></DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row style={styles.second_row_table}>
                                            <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Text</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>valeur test</Text></DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row style={styles.row_table}>
                                            <DataTable.Cell style={styles.second_text_row}><Text style={styles.second_text_row}>Text</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.text_row}><Text style={styles.second_text_row}>valeur test</Text></DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row style={styles.second_row_table}>
                                            <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Text</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>valeur text</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    </DataTable>
                                    <View style={styles.map}>
                                     <Image style={styles.map} source={require('../assets/images/maps/map.png')} />
                                    </View>
                                    <View style={styles.buttonsContainer_info_model}>
                                        <Pressable style={styles.btn_annulation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Non </Text></Pressable>
                                        <Pressable style={styles.btn_confirmation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Oui </Text></Pressable>
                                    </View>
                                </View>
                            </Modal>
                            <Modal  animationType="fade"transparent={true} style={styles.model} visible={confirm}>
                                <View style={styles.model}>
                                    <Text>Voulez-vous prendre cette taches?</Text><View style={styles.buttonsContainer}>
                                    <Pressable style={styles.btn_annulation} onPress={() =>setConfirm(!confirm)}><Text style={styles.buttonText}>Non </Text></Pressable>
                                    <Pressable style={styles.btn_confirmation} onPress={() =>setConfirm(!confirm)}><Text style={styles.buttonText}>Oui </Text></Pressable>
                                </View>
                                </View>
                            </Modal>
                            <Modal animationType="fade" transparent={true} style={styles.model} visible={annul}>
                               <View style={styles.model}>
                                    <Text>Voulez-vous annuler cette taches?</Text>
                                    <View style={styles.buttonsContainer}>
                                        <Pressable style={styles.btn_annulation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Non </Text></Pressable>
                                        <Pressable style={styles.btn_confirmation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Oui </Text></Pressable>
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
    },
    model_info:{
        height:650,
        marginTop:100,
        backgroundColor:'#fff',
        width:400,
        marginLeft:5
    },
    table:{
        marginTop:10,
        marginLeft:10,
        width:375
    },circle:{
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:'#7A4D09',
        marginTop:10,
        marginLeft:20
    },
    circle_text:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
        textAlign:'center',
        color:'#fff',
        fontSize:25
    },
    name:{
        fontSize:20,
        marginLeft:20,
        color:'#47300D'
    },
    info:{
        width:190,
        marginLeft:20
    },
    id:{
        fontSize:15,
        color:'#8C8B8B',
        marginLeft:20
    },
    contact:{
        fontSize:15,
        color:'#8C8B8B',
        marginLeft:20
    },
    table_title:{
        backgroundColor:'#715D3E',
        height:35,
        opacity:0.7
    },
    table_text_title:{
        color:'white',
        marginTop:-10,
        fontSize:16
    },
    box_info:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    buttonsContainer_info_model: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent:'center',
    },
    row_table:{
        height:30,
        backgroundColor:'#715D3E',
        opacity:0.7
    },
    second_row_table:{
        height:30,
    },
    text_row:{
        fontSize:15
    },
    second_text_row:{
        fontSize:15,
        color:'#fff'
    },
    map:{
        width:375,
        height:100,
        marginLeft:10,
        marginTop:50,
        marginBottom:50
    }
});

export default Home;
