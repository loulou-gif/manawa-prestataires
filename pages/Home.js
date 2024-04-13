import { View, ScrollView, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Header from '../components/customers/Header';
import { Paniers } from '../data/Paniers';
import Icone from 'react-native-vector-icons/Entypo'
const Home = () => {
  return (
    <View>
      <ScrollView>
        <Header />
        <Image style={styles.banner} source={require('../assets/images/Profils/p12.jpg')} />
        <View style={styles.container}>
          {Paniers.map((data) => (
            <View style={styles.box} key={data.id}>
                <Icone name='dots-three-horizontal' size={16} color="black" style={{ textAlign:"right", width:150, marginTop:-5, marginRight:-5 }}/>
              <View style={styles.buttonsContainer}>
                <Image style={styles.images} source={data.image} />
              </View>
              <View style={styles.details}>
                <Text style={styles.text}><Text style={styles.bold}>Service:</Text> {data.name}</Text>
                <Text style={styles.text}><Text style={styles.bold}>Date:</Text> {data.date}</Text>
                <Text style={styles.text}><Text style={styles.bold}>Coût:</Text> {data.price}</Text>
                <View style={styles.buttonsContainer}>
                  <Pressable style={styles.btn_annulation}><Text style={styles.buttonText}>Annuler</Text></Pressable>
                  <Pressable style={styles.btn_confirmation}><Text style={styles.buttonText}>Confirmer</Text></Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  box: {
    width: '45%', 
    margin: '2.5%', 
    borderWidth: 1,
    borderColor: '#ABA9A9',
    padding: 15,
    alignItems: "center",
  },
  images: {
    width: 120,
    height: 120,
    marginBottom: 10
  },
  details: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: "#ABA9A9",
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    color:"black"
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  btn_annulation: {
    backgroundColor: '#FFA012',
    width: 75,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  btn_confirmation: {
    backgroundColor: '#47300D',
    width: 75,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  buttonText: {
    color: "#fff"
  },
  banner: {
    width: '100%',
    height: 120
  },
});

export default Home;
