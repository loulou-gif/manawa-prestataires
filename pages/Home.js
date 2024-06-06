import { View, ScrollView, Text, StyleSheet, Image, Pressable, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/customers/Header';
import { Paniers } from '../data/Paniers';
import Icone from 'react-native-vector-icons/Entypo';
import IconeAntDesign from 'react-native-vector-icons/AntDesign';
import IconeFontAwesome from 'react-native-vector-icons/FontAwesome';
import { DataTable } from 'react-native-paper';
import InfoStoreBare from '../components/customers/InfoStoreBar';
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import IconeAntDesign from 'react-native-vector-icons/AntDesign'
import IconeFeather from 'react-native-vector-icons/Feather'
import IconeEntypo from 'react-native-vector-icons/Entypo'
import SearchBar from '../components/customers/SearchBar';
import { scale, verticalScale } from 'react-native-size-matters';

const Home = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false); 
    const [ confirm, setConfirm] = useState(false);
    const [ annul, setAnnul] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState(null);
    const [columns , setColumns] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState("");

    // Fonction de gestion de la recherche
    const handleSearch = (text) => {
        setSearchPhrase(text);
    };

    // Fonction de filtrage
    const filterData = (data, searchTerm) => {
        return data.filter(item =>
            item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const filteredStore = searchPhrase ? filterData(Paniers, searchPhrase) : Paniers;

    const handleInfoFacture = (userData) =>{
        setSelectedUserData(userData);
        setModalVisible(true)
    }
    const handleVisible =() =>{
        setColumns(!columns)
    }
    return (
        <View style={{height:'100%', flex:1}}>
        <Header />
            <ScrollView>
                <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} onChangeText={handleSearch} navigation={navigation}/>
                {
                    columns ?
                    (
                        <TouchableOpacity style={styles.box_icone} onPress={handleVisible}>
                            <IconeEntypo style={styles.Icone} name='grid' size={30}/>
                        </TouchableOpacity>
                    )
                    :
                    (
                        <TouchableOpacity style={styles.box_icone} onPress={handleVisible}>
                            <IconeFontAwesome style={styles.Icone} name='th-list' size={30}/>
                        </TouchableOpacity>
                    )
                }
                {
                    columns ?
                    (<View style={styles.container}>
                        {filteredStore.map((data) => (
                            <View style={styles.box} key={data.id}>
                                <Icone key={data.id} name='dots-three-horizontal' onPress={() => handleInfoFacture(data)} style={{ textAlign: "right", width: scale(150), marginRight: scale(15) }} />
                                <View style={styles.buttonsContainer}>
                                    <Image style={styles.images} source={data.image} />
                                </View>
                                <View style={styles.details}>
                                    <View style={styles.preview_details}>
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
                                    <View style={styles.backgroundModal}>
                                        {selectedUserData &&
                                        <View style={styles.model_info}>
                                            <Pressable   onPress={() => setModalVisible(!modalVisible)}><Text style={{marginRight:10, marginTop:10, textAlign:'right'}}><IconeAntDesign name='closecircleo' size={26}/></Text></Pressable>
                                            <View style={styles.box_info}>
                                                <View style={styles.circle}>
                                                    <Text style={styles.circle_text}>JK</Text>
                                                </View>
                                                <View style={styles.info}>
                                                    <Text style={styles.name}>{selectedUserData.client}</Text>
                                                    <Text style={styles.id}>ID client: {selectedUserData.IDclient}</Text>
                                                    <Text style={styles.contact}>Contact: {selectedUserData.contactClient}</Text>
                                                </View>
                                                <View style={{ marginRight:10}}>
                                                    <IconeFontAwesome size={20} name='download'/>
                                                </View>
                                            </View>
                                            <DataTable style={styles.table}>
                                                <DataTable.Header style={styles.table_title}>
                                                    <DataTable.Title style={styles.table_text_title}><Text style={styles.table_text_title}>Service</Text></DataTable.Title>
                                                    <DataTable.Title style={styles.table_text_title}><Text style={styles.table_text_title}>{selectedUserData.name}</Text></DataTable.Title>
                                                </DataTable.Header>
                                                <DataTable.Row style={styles.second_row_table}>
                                                    <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Durée du service </Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>{selectedUserData.durée}</Text></DataTable.Cell>
                                                </DataTable.Row>
                                                <DataTable.Row style={styles.row_table}>
                                                    <DataTable.Cell style={styles.text_row}><Text style={styles.second_text_row}>Coût</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.text_row}><Text style={styles.second_text_row}>{selectedUserData.price}</Text></DataTable.Cell>
                                                </DataTable.Row>
                                                <DataTable.Row style={styles.second_row_table}>
                                                    <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Date</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>{selectedUserData.date}</Text></DataTable.Cell>
                                                </DataTable.Row>
                                                <DataTable.Row style={styles.row_table}>
                                                    <DataTable.Cell style={styles.second_text_row}><Text style={styles.second_text_row}>Lieu</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.text_row}><Text style={styles.second_text_row}>{selectedUserData.lieu}</Text></DataTable.Cell>
                                                </DataTable.Row>
                                                <DataTable.Row style={styles.second_row_table}>
                                                    <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Avance</Text></DataTable.Cell>
                                                    <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>{selectedUserData.avance}</Text></DataTable.Cell>
                                                </DataTable.Row>
                                            </DataTable>
                                            <View style={styles.map}>
                                                <Image style={styles.map} source={require('../assets/images/maps/map.png')} />
                                            </View>
                                            <View style={styles.buttonsContainer_info_model}>
                                                <Pressable style={styles.btn_annulation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Non </Text></Pressable>
                                                <Pressable style={styles.btn_confirmation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Oui </Text></Pressable>
                                            </View>
                                        </View>}
                                    </View>
                                </Modal>
                                <Modal  animationType="fade"transparent={true} style={styles.model} visible={confirm}>
                                    <View style={styles.backgroundModal}>
                                        <View style={styles.model}>
                                            <Text>Voulez-vous prendre cette taches?</Text>
                                            <View style={styles.buttonsContainer}>
                                                <Pressable style={styles.btn_annulation} onPress={() =>setConfirm(!confirm)}><Text style={styles.buttonText}>Non </Text></Pressable>
                                                <Pressable style={styles.btn_confirmation} onPress={() =>setConfirm(!confirm)}><Text style={styles.buttonText}>Oui </Text></Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                                <Modal animationType="fade" transparent={true} style={styles.model} visible={annul}>
                                   <View style={styles.backgroundModal}> 
                                        <View style={styles.model}>
                                            <Text>Voulez-vous annuler cette taches?</Text>
                                            <View style={styles.buttonsContainer}>
                                                <Pressable style={styles.btn_annulation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Non </Text></Pressable>
                                                <Pressable style={styles.btn_confirmation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Oui </Text></Pressable>
                                            </View>
                                        </View>
                                   </View>
                                </Modal>
                            </View>
                        ))}
                    </View>
                    ):(
                        <View style={styles.container}>
                            {filteredStore.map((data) => (
                                <TouchableOpacity onPress={() => handleInfoFacture(data)} style={styles.second_box} key={data.id}>
                                    {/* <Icone key={data.id} name='dots-three-horizontal'  size={16} color="black" style={{ textAlign: "right", width: 150, marginTop: -5, marginRight: -5 }} /> */}
                                    <View >
                                        <Image style={styles.second_images} source={data.image} />
                                    </View>
                                    <View style={styles.second_details}>
                                        <View>
                                            <Text style={styles.text}><Text style={styles.bold}>Service:</Text> {data.name}</Text>
                                            <Text style={styles.text}><Text style={styles.bold}>Date:</Text> {data.date}</Text>
                                            <Text style={styles.text}><Text style={styles.bold}>Coût:</Text> {data.price}</Text>
                                        </View>
                                        <View style={styles.second_icones}>
                                            <IconeMaterialCommunityIcons style={styles.second_icone} name='book-cancel' color='red' onPress={() => setAnnul(true)} size={30} />
                                            <IconeAntDesign style={styles.second_icone} name='checksquare' color='orange' onPress={() => setConfirm(!true)} size={30} />
                                        </View>
                                    </View>
                                    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible); }}>
                                        <View style={styles.backgroundModal}>
                                            {selectedUserData && 
                                            <View style={styles.model_info}>
                                                <Pressable   onPress={() => setModalVisible(!modalVisible)}><Text style={{marginRight:scale(10), marginTop:scale(10), textAlign:'right'}}><IconeAntDesign name='closecircleo' size={26}/></Text></Pressable>
                                                <View style={styles.box_info}>
                                                    <View style={styles.circle}>
                                                        <Text style={styles.circle_text}>JK</Text>
                                                    </View>
                                                    <View style={styles.info}>
                                                        <Text style={styles.name}>{selectedUserData.client}</Text>
                                                        <Text style={styles.id}>ID client: {selectedUserData.IDclient}</Text>
                                                        <Text style={styles.contact}>Contact: {selectedUserData.contactClient}</Text>
                                                    </View>
                                                    <View style={{ marginRight:scale(15)}}>
                                                        <IconeFontAwesome size={20} name='download'/>
                                                    </View>
                                                </View>
                                                <DataTable style={styles.table}>
                                                    <DataTable.Header style={styles.table_title}>
                                                        <DataTable.Title style={styles.table_text_title}><Text style={styles.table_text_title}>Service</Text></DataTable.Title>
                                                        <DataTable.Title style={styles.table_text_title}><Text style={styles.table_text_title}>{selectedUserData.name}</Text></DataTable.Title>
                                                    </DataTable.Header >
                                                    <DataTable.Row style={styles.second_row_table} >
                                                        <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Durée du service </Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>{selectedUserData.durée}</Text></DataTable.Cell>
                                                    </DataTable.Row>
                                                    <DataTable.Row style={styles.row_table}>
                                                        <DataTable.Cell style={styles.text_row}><Text style={styles.second_text_row}>Coût</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.text_row}><Text style={styles.second_text_row}>{selectedUserData.price}</Text></DataTable.Cell>
                                                    </DataTable.Row>
                                                    <DataTable.Row style={styles.second_row_table}>
                                                        <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Date</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>{selectedUserData.date}</Text></DataTable.Cell>
                                                    </DataTable.Row>
                                                    <DataTable.Row style={styles.row_table}>
                                                        <DataTable.Cell style={styles.second_text_row}><Text style={styles.second_text_row}>Lieu</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.text_row}><Text style={styles.second_text_row}>{selectedUserData.lieu}</Text></DataTable.Cell>
                                                    </DataTable.Row>
                                                    <DataTable.Row style={styles.second_row_table}>
                                                        <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>Avance</Text></DataTable.Cell>
                                                        <DataTable.Cell style={styles.text_row}><Text style={styles.text_row}>{selectedUserData.avance}</Text></DataTable.Cell>
                                                    </DataTable.Row>
                                                </DataTable>
                                                <View style={styles.map}>
                                                    <Image style={styles.map} source={require('../assets/images/maps/map.png')} />
                                                </View>
                                                <View style={styles.buttonsContainer_info_model}>
                                                    <Pressable style={styles.btn_annulation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Non </Text></Pressable>
                                                    <Pressable style={styles.btn_confirmation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Oui </Text></Pressable>
                                                </View>
                                            </View>}
                                        </View>
                                    </Modal>
                                    <Modal  animationType="fade"transparent={true} style={styles.model} visible={confirm}>
                                        <View style={styles.backgroundModal}>
                                            <View style={styles.model}>
                                                <Text>Voulez-vous prendre cette taches?</Text>
                                                <View style={styles.buttonsContainer}>
                                                    <Pressable style={styles.btn_annulation} onPress={() =>setConfirm(!confirm)}><Text style={styles.buttonText}>Non </Text></Pressable>
                                                    <Pressable style={styles.btn_confirmation} onPress={() =>setConfirm(!confirm)}><Text style={styles.buttonText}>Oui </Text></Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                    <Modal animationType="fade" transparent={true} style={styles.model} visible={annul}>
                                    <View style={styles.backgroundModal}> 
                                            <View style={styles.model}>
                                                <Text>Voulez-vous annuler cette taches?</Text>
                                                <View style={styles.buttonsContainer}>
                                                    <Pressable style={styles.btn_annulation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Non </Text></Pressable>
                                                    <Pressable style={styles.btn_confirmation} onPress={() =>setAnnul(!annul)}><Text style={styles.buttonText}>Oui </Text></Pressable>
                                                </View>
                                            </View>
                                    </View>
                                    </Modal>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )
                }
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
        marginTop: scale(10),
    },
    box: {
        width: scale(157),
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
    preview_details:{
        // borderWidth:1,
        // width:scale(130),
    },
    text: {
        fontSize: scale(10),
        color: "#ABA9A9",
        marginBottom: scale(5),

    },
    bold: {
        fontWeight: 'bold',
        color: "black"
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: verticalScale(10),
        marginBotto: verticalScale(10),
    },
    btn_annulation: {
        backgroundColor: '#FFA012',
        width: scale(65),
        height: verticalScale(25),
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    btn_confirmation: {
        backgroundColor: '#47300D',
        width: scale(65),
        height: verticalScale(25),
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    buttonText: {
        color: "#fff"
    },
    banner: {
        width: '100%',
        height: '100%'
    },
    model:{
        width:"100%",
        height:verticalScale(150),
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent:'center',
        width:scale(250)
    },
    model_info:{ 
        height:scale(500),
        // marginTop:scale(100),
        backgroundColor:'#fff',
        width:scale(340),
        flexDirection:'column'
    },
    table:{
        marginTop:verticalScale(10),
        marginLeft:10,
        width:scale(320)
    },
    circle:{
        width:scale(80),
        height:scale(80),
        borderRadius:scale(50),
        backgroundColor:'#7A4D09',
        marginTop:scale(5),
        marginLeft:scale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle_text:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        // margin: scale(20),
        // textAlign:'center',
        color:'#fff',
        fontSize:scale(20)
    },
    name:{
        fontSize:scale(16),
        marginLeft:scale(16),
        color:'#47300D'
    },
    info:{
        width:scale(185),
        marginLeft:scale(5)
    },
    id:{
        fontSize:scale(12),
        color:'#8C8B8B',
        marginLeft:scale(16)
    },
    contact:{
        fontSize:scale(12),
        color:'#8C8B8B',
        marginLeft:scale(16)
    },
    table_title:{
        backgroundColor:'#715D3E',
        height:scale(30),
        opacity:0.7
    },
    table_text_title:{
        color:'white',
        marginTop:scale(-8),
        fontSize:scale(13)
    },
    box_info:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
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
        opacity:0.7,
        marginTop:-10,
    },
    second_row_table:{
        height:30,
        marginTop:-10,
    },
    text_row:{
        fontSize:scale(12), 
    },
    second_text_row:{
        fontSize:15,
        color:'#fff'
    },
    map:{
        width:scale(320),
        height:verticalScale(100),
        marginLeft:5,
        marginTop:verticalScale(35),
        marginBottom:50
    },
    backgroundModal:{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height:scale(730),
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
    },
    Icone:{
        // marginTop:20,
        fontSize:scale(25),
        color:'orange',
        fontWeight:'bold',
        marginRight:5
    },
    box_icone:{
        // borderWidth:1,
        justifyContent:"center",
        height:scale(40),
        justifyContent:'center',
        alignItems:'flex-end',
        alignSelf:'flex-end',
        width:'10%'
    },
    second_images:{
        width:scale(60),
        height:scale(60),
        borderRadius:8,
        marginRight:scale(10)
    },
    second_box:{
        flexDirection:'row',
        width:'100%',
        borderBottomWidth:1,
        height:100,
        alignItems:'center',
        paddingLeft:10,
        borderColor:'grey'
    },
    second_details:{
        flexDirection:'row',
        justifyContent:'space-between',
        // borderWidth:1,
        width:'75%'
    },
    second_icones:{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    second_icone:{
        margin:2
    }
});

export default Home;
