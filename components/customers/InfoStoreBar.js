import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import IconeFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconeFeather from 'react-native-vector-icons/Feather'

const InfoStoreBare = ({navigation}) => {
  return (
    <View>
      <View style={styles.bottom}>
        <View style={styles.flex}>
            <Image source={require('../../assets/images/Profils/p8.png')} />
            <View styles={styles.text}>
                <Text style={styles.title}>Salon de coiffure</Text>
                <Text style={styles.state}>Ouvert (09:00 - 20:30)</Text>
                <View style={styles.icone}>
                    <IconeFeather name='edit' onPress={() => navigation.navigate('ModifyStore')} size={16}/>
                </View>
            </View>
            <View style={styles.points}>
                <IconeFontAwesome name='money' color="green" size={18}/>  
                <Text>35 pts</Text>
            </View>
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
        width:400,
        marginTop:15,
        marginBottom:5,
    },
    bottom:{
        borderBottomWidth: 1,
        borderBlockColor:'#ABA9A9',
        paddingBottom:20
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
        marginTop:10,
        // borderWidth:1,
        // flexDirection:'row'
    },
    points:{
        flexDirection:'row',
        borderColor:'#ABA9A9',
        borderWidth:1,
        marginTop:5,
        padding:5,
        borderRadius:8,
        alignContent:'space-between',
        width:100,
        justifyContent:'space-between',
        height:30
    }    
})

export default InfoStoreBare