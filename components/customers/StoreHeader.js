import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import IconeFeather from 'react-native-vector-icons/Feather'

const StoreHeader = ({navigation}) => {
  return (
    <View>
      <Image style={styles.image} source={require("../../assets/images/servicesBackgrounds/babershop.jpg")}/>
      <View style={styles.bottom}>
        <View style={styles.flex}>
            <Image source={require('../../assets/images/Profils/p8.png')} />
            <View styles={styles.text}>
                <Text style={styles.title}>Salon de coiffure</Text>
                <Text style={styles.state}>Ouvert (09:00 - 20:30)</Text>
                <View styles={styles.icone}>
                    <IconeFeather name='edit' onPress={() => navigation.navigate('CreateServices')} size={16}/>
                </View>
            </View>
            
        </View>
        <View style={styles.flex} >
            <Text styles={styles.cursor} onPress={() => navigation.navigate('Services')} >Service</Text>
            <Text styles={styles.menu} onPress={() => navigation.navigate('Aperçu')}>Aperçu</Text>
            <Text styles={styles.menu} onPress={() => navigation.navigate('Avis')}>Avis</Text>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    image:{
        width:500,
        height:120
    },
    state:{
        color:"green",
        fontSize:12,
    },
    title:{
        fontSize:20,
    },
    flex:{
        flexDirection: "row",
        justifyContent:"space-evenly",
        width:250,
        marginTop:15,
        marginBottom:5,
    },
    bottom:{
        borderBottomWidth: 1,
        borderBlockColor:'#ABA9A9',
    },
    text:{
        marginBottom:50,
    },
    menu:{
        fontSize:16,
    },
    cursor:{
        fontSize:16,
        color:"#DE9F42",
    },
    icone:{
        marginTop:100,
        backgroundColor:'red',
        borderWidth:1,
        borderColor:'red'
    },
})

export default StoreHeader