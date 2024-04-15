import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/customers/Header'
import StoreHeader from '../components/customers/StoreHeader'
import Icone from 'react-native-vector-icons/EvilIcons';
import IconeFeather from 'react-native-vector-icons/Feather'
import IconeAntDesign from 'react-native-vector-icons/AntDesign'
import IconeMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Aperçus from '../components/customers/Aperçus';

// lightbulb-on-outline

const Aperçu = ({navigation}) => {
  return (
    <ScrollView>
        <View>
            <Header/>
            <StoreHeader navigation={navigation}/>
            <View>
                <View style={styles.center}>
                    <View style={styles.def}>
                        <IconeMaterialCommunityIcons style={styles.light} name='lightbulb-on-outline' size={50} color='#fff'/>
                        <Text style={styles.def_text}>Les aperçus peuvent être des témoignages de vos clients, leur recommendations ou des commentaires d'un clients que vous ajoutez à votre mur bien sure avec son concentement</Text>
                    </View>
                </View>
            </View>
            <Pressable onPress={() => navigation.navigate('CreateServices')} style={styles.button}>
                <Text style={styles.btn_text}><Icone name='plus'  size={20} style={{ marginTop:10}} /> Ajouter un Aperçu </Text>
            </Pressable>
            <Aperçus navigation={navigation}/>
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
    }
})

export default Aperçu