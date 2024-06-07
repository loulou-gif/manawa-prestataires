import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import React from 'react';
import IconeIonicons from 'react-native-vector-icons/Ionicons';
import IconeFoundation from 'react-native-vector-icons/Foundation';
import { scale, verticalScale } from 'react-native-size-matters';

const Conversation = ({ d, onClose }) => {
  // Fonction pour insérer des retours à la ligne tous les 80 caractères
  const insertLineBreaks = (text, length) => {
    let result = '';
    for (let i = 0; i < text.length; i += length) {
      result += text.substring(i, i + length) + '\n';
    }
    return result.trim();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => onClose(null)}>
          <IconeIonicons name='arrow-back' size={20} style={styles.color} />
        </TouchableOpacity>
        <Image style={styles.image} source={d.pp} />
        <Text style={styles.text_header}>{d.name}</Text>
      </View>
      <ImageBackground source={require('../../assets/images/background/06.png')} style={styles.backgroundImage}>
      <ScrollView style={styles.conversation}>
        <View style={styles.expediteur}>
          <Text style={styles.body}>{insertLineBreaks('Hello j\'espère que tu te porte bien', 45)}</Text>
        </View>
        <View style={styles.recepteur}>
          <Text style={styles.body}>{insertLineBreaks('Salut ça va molo on avance avec Dieu. tu n\'a pas un 500fr là bas pour moi?', 45)}</Text>
        </View>
      </ScrollView>
      </ImageBackground>
      <View style={styles.input}>
        <View style={styles.media}>
          <TouchableOpacity style={styles.icon}>
            <IconeFoundation name='photo' size={24} style={styles.color_media} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconeIonicons name='camera' size={24} style={styles.color_media} />
          </TouchableOpacity>
        </View>
        <TextInput style={styles.champs} placeholder='' multiline={true} />
        <TouchableOpacity style={styles.send}>
          <IconeIonicons name='send' size={18} style={styles.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height:'100%'
  },
  header: {
    height: verticalScale(50),
    backgroundColor: '#7A4D09',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  text_header: {
    fontSize: scale(18),
    color: 'white',
    marginLeft: -5,
  },
  conversation: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0 0.1)',
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
  },
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#ABA9A9',
    height: verticalScale(50),
  },
  champs: {
    flex: 1,
    height: '65%',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: '#ABA9A9',
    borderWidth: 1,
    paddingLeft: 10,
    color: '#7A4D09',
  },
  media: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  send: {
    width: scale(35),
    height: verticalScale(35),
    borderRadius: 25,
    backgroundColor: '#DE9F42',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  color: {
    color: 'white',
  },
  color_media: {
    color: '#ABA9A9',
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
  },
  image: {
    width: scale(35),
    height: verticalScale(35),
    backgroundColor: '#ABA9A9',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  body: {
    color: 'white',
  },
  expediteur: {
    backgroundColor: '#DE9F42',
    alignSelf: 'flex-start',
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  recepteur: {
    backgroundColor: '#ABA9A9',
    alignSelf: 'flex-end',
    marginTop: 15,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
});

export default Conversation;
