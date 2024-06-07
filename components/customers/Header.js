import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters';

const Header = () => {
  return (
    <View style={styles.header}>
        <Text style={styles.logo}>MANAWA</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
      backgroundColor:"#DE9F42",
      height:verticalScale(50),
      justifyContent:'center'
    },
    logo:{
      color:"#fff",
      marginLeft:verticalScale(16),
      fontStyle: "italic",
      fontWeight:"bold",
      fontSize:scale(20),
    }
})

export default Header