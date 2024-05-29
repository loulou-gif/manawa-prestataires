import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const StoreEdit = ({navigation, modif, setModif}) => {

    const handleVisible =()=>{
        setModif(!modif)
    }
  return (
    <View style={styles.box}>
                <Text style={styles.titre}>MODIFIER SA BOUTIQUE</Text>
                <View style={styles.inputs}>
                    <View style={styles.flex_input}>
                        <Image style={styles.banner} />
                        <TouchableOpacity style={styles.upload}><Text style={styles.btn}>banner</Text></TouchableOpacity>
                    </View>
                    <View style={styles.flex_input}>
                        <Image style={styles.profil_input}/>
                        <TouchableOpacity style={styles.upload}><Text style={styles.btn}>profil</Text></TouchableOpacity>
                    </View>
                    <TextInput style={styles.input} placeholder='Nom de la boutique'/>
                    <View style={styles.flex}> 
                        <TouchableOpacity style={styles.time}>
                            <Text> 09:00 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.time}>
                            <Text> 17:00 </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flex}>
                        <TouchableOpacity style={styles.save}><Text style={styles.btn}>VALIDER</Text></TouchableOpacity>
                        <TouchableOpacity onPress={handleVisible} style={styles.cancel}><Text style={styles.btn}>ANNULER</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
  )
}

const styles = StyleSheet.create({
    box:{
        width:'80%',
        height:'60%',
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    titre:{
        textAlign:'center',
        fontSize:25
    },
    inputs:{
        width:'90%',
        height:'85%',
        alignItems:'center',
        justifyContent:'center'
    },
    banner:{
        width:'65%',
        height:'100%',
        borderWidth:1,
        borderColor:'grey',
        borderRadius:8
    },
    upload:{
        width:'30%',
        height:'30%',
        backgroundColor:'orange',
        justifyContent:'center',
        alignItems:'center'
    },
    btn:{
        color:'#fff',
        fontSize:14,
    },
    input:{
        borderWidth:1,
        borderColor:'#ABA9A9',
        width:'85%',
        backgroundColor:'#fff',
        height:40
    },
    save:{
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',
        width:'45%',
        height:'30%',
    },
    cancel:{
        backgroundColor:'grey',
        alignItems:'center',
        justifyContent:'center',
        width:'45%',
        height:'30%',
    },
    time:{
        borderWidth:1,
        width:'40%',
        alignItems:'center',
        borderRadius:8,
        borderColor:'grey',
        height:'100%',
    },
    profil_input:{
        width:'40%',
        height:'95%',
        borderColor:'#ABA9A9',
        borderRadius:8,
        borderWidth:1
    },
    flex_input:{
        flexDirection: "row",
        justifyContent:"space-between",
        width:250,
        marginTop:15,
        marginBottom:5,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 250,
        marginTop: 15,
        marginBottom: 5,
    },
})

export default StoreEdit