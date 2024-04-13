import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import { Store } from '../../data/Store.js'
const Prestataires = ({navigation}) => {
  return (
    <View style={styles.box} >
        {Store.map((data) => (
          <Pressable onPress={ () => navigation.push('Prestataire')}>
            <View style={styles.flex} key={data.id}>
              <Image style={styles.imageSize} source={data.profil}/>
              <View style={styles.textBox} >
                <Text style={styles.Title}>{data.title} </Text>
                <Text style={styles.details}>{data.description} </Text>
              </View>
          </View>
        </Pressable>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  imageSize:{
    height:70,
    width:70,
    borderRadius:8
  },
  Title:{
    fontSize:16,
    color:"black",
  },
  details:{
    color:"#ABA9A9",
    fontSize:12,
    width: 250,
    height:30
  },
  flex:{
    borderBottomWidth:1,
    borderBlockColor:'#ABA9A9',
    paddingLeft:20,
    padding: 10,
    flexDirection: "row",
    flexWrap:"wrap",
  },
  textBox:{
    margin:10,
    marginBottom:15,
  },
  box:{
    marginTop:50
  }
})

export default Prestataires