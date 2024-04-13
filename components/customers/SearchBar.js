import { View, TextInput, StyleSheet,Button } from 'react-native'
import React from 'react'

const SearchBar = ({navigation}) => {
  return (
    <View style={styles.centre} >
        <TextInput style={styles.input} placeholder='Recherche...' />
        {/* <Button onPress={() => navigation.push("Owner")} title="prestataire"/> */}
    </View>
  )
}
const styles = StyleSheet.create({
    input:{
      width: 350,
      height:50,
      paddingLeft: 30,
      borderRadius:8,
      borderStyle: "solid",
      borderColor: 'gray',
      borderBottomWidth:1
    },
    centre:{
      alignItems:"center",
      marginTop: 30,
    }
  })

export default SearchBar