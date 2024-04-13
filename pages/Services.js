import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/customers/Header'
import StoreHeader from '../components/customers/StoreHeader'

const Services = () => {
  return (
    <View>
      <Header/>
      <StoreHeader/>
      <View>
        <Pressable style={styles.button}>
            <Text style={styles.btn_text}>Ajouter un service</Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <Image style={styles.image} />
        <View >
            <Text style={styles.title}>Coupe homme</Text>
            <Text style={styles.description}>Coiffure de tout genre pour homme</Text>
        </View>
        <View>
            <Text>10.000 XOF</Text>
            <Text>Icone</Text>
        </View>
      </View>
    </View>
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
        width:100,
        height:30,
        margin:10,
        borderRadius:8
    },
    btn_text:{
        color:'#fff', 
        fontSize:9,
        textAlign:"center",
        marginTop:8,       
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
    }
})

export default Services