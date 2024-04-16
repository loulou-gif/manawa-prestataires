import IconeFontAwesome from 'react-native-vector-icons/FontAwesome'
import react, { View, Text, StyleSheet} from 'react-native'

export const avis =[
    {
        id:1,
        name:"Konan Julius",
        commentaire:"Konan JuliusKonan JuliusKonan JuliusKonan JuliusKonan JuliusKonan JuliusKonan Julius",
        image: require("../assets/images/Profils/p8.png"),
        icone:<Text ><IconeFontAwesome  name='star' size={18}color="#DE9F42"/><IconeFontAwesome  name='star' size={18}color="#DE9F42"/><IconeFontAwesome  name='star-half-empty' size={18}color="#DE9F42"/></Text>,
        icones:4
    },
    {
        id:2,
        name:"Konan Julius",
        commentaire:"Konan JuliusKonan JuliusKonan JuliusKonan JuliusKonan JuliusKonan JuliusKonan Julius",
        image: require("../assets/images/Profils/p8.png"),
        icone:<Text ><IconeFontAwesome  name='star' size={18}color="#DE9F42"/><IconeFontAwesome  name='star-o' size={18}color="#DE9F42"/><IconeFontAwesome  name='star-o' size={18}color="#DE9F42"/></Text>,
        icones:2
    },
    {
        id:3,
        name:"Konan Julius",
        commentaire:"Konan JuliusKonan JuliusKonan JuliusKonan JuliusKonan JuliusKonan JuliusKonan Julius",
        image: require("../assets/images/Profils/p8.png"),
        icone:<Text  ><IconeFontAwesome   name='star' size={18}color="#DE9F42"/><IconeFontAwesome  name='star' size={18}color="#DE9F42"/><IconeFontAwesome  name='star-o' size={18}color="#DE9F42"/></Text>,
        icones:3
    },
]

export const styles = StyleSheet.create({
    box:{
        flexDirexion:'row',
    },
    icone:{
        color:'#7A4D09'
    }
})