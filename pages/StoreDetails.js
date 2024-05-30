import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { db, doc, setDoc } from '../firebase/configs'; // Assurez-vous que vos configurations Firebase sont correctes

const StoreDetails = ({ route, navigation }) => {
  const { id } = route.params; // Récupérez l'ID de l'utilisateur à partir des paramètres de navigation

  const [storeName, setStoreName] = useState('');
  const [openingTime, setOpeningTime] = useState(new Date());
  const [closingTime, setClosingTime] = useState(new Date());
  const [logoUri, setLogoUri] = useState(null);
  const [showOpeningTimePicker, setShowOpeningTimePicker] = useState(false);
  const [showClosingTimePicker, setShowClosingTimePicker] = useState(false);

  const handleSubmit = async () => {
    try {
      const storeRef = doc(db, 'Store', id);
      await setDoc(storeRef, {
        name: storeName,
        openingTime: openingTime.toISOString().substr(11, 5),
        closingTime: closingTime.toISOString().substr(11, 5),
        logoUri,
      });

      navigation.push('BottomTab', { id: id });
    } catch (error) {
      console.log('Erreur lors de l\'enregistrement de la boutique:', error);
    }
  };

  const selectLogo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLogoUri(result.assets[0].uri);
    }
  };

  const handleOpeningTimeChange = (event, selectedTime) => {
    setShowOpeningTimePicker(false);
    if (selectedTime) {
      setOpeningTime(selectedTime);
    }
  };

  const handleClosingTimeChange = (event, selectedTime) => {
    setShowClosingTimePicker(false);
    if (selectedTime) {
      setClosingTime(selectedTime);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.box}>
        <Text style={styles.title}>RENSEIGNER LES INFORMATIONS DE LA BOUTIQUE</Text>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder='Nom de la boutique'
            value={storeName}
            onChangeText={setStoreName}
          />
          <View style={styles.flex}>
            <View style={styles.open}>
              <Text style={styles.text}>Ouverture</Text>
              <TouchableOpacity style={styles.time} onPress={() => setShowOpeningTimePicker(true)}>
                <Text style={styles.text}>{openingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.close}>
              <Text style={styles.text}>Fermeture</Text>
              <TouchableOpacity style={styles.time} onPress={() => setShowClosingTimePicker(true)}>
                <Text style={styles.text}>{closingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box_image}>
            {logoUri ? (
              <Image source={{ uri: logoUri }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.textPlaceholder}>Logo</Text>
              </View>
            )}
            <TouchableOpacity style={styles.upload} onPress={selectLogo}>
              <Text style={styles.text_btn}>logo</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.valider} onPress={handleSubmit}>
            <Text style={styles.text_btn}>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showOpeningTimePicker && (
        <DateTimePicker
          value={openingTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleOpeningTimeChange}
        />
      )}
      {showClosingTimePicker && (
        <DateTimePicker
          value={closingTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleClosingTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'rgb(122, 77, 9)',
  },
  box: {
    width: '95%',
    height: 500,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30%',
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: '#7A4D09',
    marginTop: 10,
  },
  inputs: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '95%',

    marginTop: 25,
  },
  input: {
    borderWidth: 1,
    width: '80%',
    height: 40,
    paddingLeft: 10,
    borderRadius: 8,
    borderColor: '#CBC5C5',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  time: {
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    height: 40,
    borderColor: '#CBC5C5',
  },
  open: {
    marginTop: 10,
    marginBottom: 10,
    width: '45%',
  },
  close: {
    marginTop: 10,
    marginBottom: 10,
    width: '45%',
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 80,
    borderWidth: 1,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 120,
    height: 80,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CBC5C5',
  },
  textPlaceholder: {
    color: '#CBC5C5',
    textAlign: 'center',
  },
  box_image: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '80%',
  },
  upload: {
    width: 90,
    justifyContent: 'center',
    height: '40%',
    marginTop: '8%',
    borderRadius: 8,
    backgroundColor: 'orange',
  },
  valider: {
    backgroundColor: 'orange',
    width: '80%',
    height: 35,
    justifyContent: 'center',
    borderRadius: 8,
  },
  text_btn: {
    color: 'white',
    textAlign: 'center',
  },
});

export default StoreDetails;
