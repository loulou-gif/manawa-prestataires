import { View, Text , Image, StyleSheet} from 'react-native'
import React from 'react'
import IconeFeather from 'react-native-vector-icons/Feather'
import IconeAntDesign from 'react-native-vector-icons/AntDesign'
import { AperçuData } from '../../data/AperçuData'
const Aperçus = () => {
  return (
    <View>
      {AperçuData.map((data) =>(
        <View key={data.id}>
            <View style={styles.box}>
                <Image style={styles.image} source={data.image}/>
                <View style={styles.box_text}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.comment}>{data.commentaire}</Text>
                    <View styles={styles.icone}>
                    <Text><IconeFeather name='edit' onPress={() => navigation.navigate('ModifyServices')} size={20} /> <IconeAntDesign name='delete' onPress={() => setDeleted(!deleted)} size={20} color='red'/> </Text>
                    </View>
                </View>
            </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
    box_text:{
        paddingTop:10
    },
    image:{
        width:120,
        height:120,
        borderRadius:8
    },
    name:{
        fontSize:18,
        color:'#47300D'
    },
    comment:{
        color:'#ABA9A9',
        fontSize:14,
        width:230,
    },box:{
        padding:10,
        borderWidth:1,
        borderColor:'#D9D9D9',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    icone:{
        alignItems:'flex-end',
        borderWidth:1,
        width:50
    },
})

export default Aperçus