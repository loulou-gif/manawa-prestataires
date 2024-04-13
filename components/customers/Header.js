import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.header}>
        <Text style={styles.logo}>MANAWA</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
      marginTop:30,
      backgroundColor:"#DE9F42",
      height:47
    },
    logo:{
      color:"#fff",
      marginLeft:20,
      fontStyle: "italic",
      fontWeight:"bold",
      fontSize:20,
      marginTop: 10
    }
})

export default Header