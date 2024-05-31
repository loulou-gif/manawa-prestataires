import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db, doc, getDoc, setDoc } from '../../firebase/configs'; // Importez correctement vos configurations Firebase

const ModifyStore = ({ navigation }) => {
  const userId = auth.currentUser.uid; // Obtenez l'ID de l'utilisateur connecté
  const [name, setName] = useState('');
  const [open, setOpen] = useState(new Date());
  const [close, setClose] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      const storeRef = doc(db, 'Store', userId);
      const storeDoc = await getDoc(storeRef);

      if (storeDoc.exists()) {
        const storeData = storeDoc.data();
        setName(storeData.name);
        setOpen(new Date(storeData.openingTime));
        setClose(new Date(storeData.closingTime));
        setImage(storeData.logoUri);
        setDescription(storeData.description);
      }
    };

    fetchStoreDetails();
  }, [userId]);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.canceled) {
      const source = result.assets[0].uri;
      console.log(source);
      setImage(source);
    }
  };

  const showPicker = (currentMode, target) => {
    setIsPickerShow(true);
    setMode(currentMode);
    setPickerTarget(target);
  };

  const onChange = (event, value) => {
    setIsPickerShow(false);
    if (event.type === "set") { // "set" means the user clicked "OK"
      if (pickerTarget === 'open') {
        setOpen(value);
      } else if (pickerTarget === 'close') {
        setClose(value);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const storeRef = doc(db, 'Store', userId);
      await setDoc(storeRef, {
        name,
        openingTime: open.toISOString(),
        closingTime: close.toISOString(),
        logoUri: image,
        description
      }, { merge: true }); // Utiliser { merge: true } pour mettre à jour les champs existants sans supprimer les autres
      navigation.goBack();
    } catch (error) {
      console.log('Erreur lors de l\'enregistrement de la boutique:', error);
    }
  };

  return (
    <View>
      <ImageBackground style={styles.background}>
        {image ? (
          <ImageBackground style={styles.profil} source={{ uri: image }}>
            <TouchableOpacity onPress={selectImage} style={styles.icon}>
              <IconFeather style={styles.icones} name='edit' size={20} />
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <ImageBackground style={styles.profil}>
            <TouchableOpacity onPress={selectImage} style={styles.icon}>
              <IconFeather style={styles.icones} name='edit' size={20} />
            </TouchableOpacity>
          </ImageBackground>
        )}
        <Text style={styles.title}>{name ? name : 'Nom de la boutique'}</Text>
      </ImageBackground>
      <View style={styles.forms}>
        <Text style={styles.label}>Nom de la boutique</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.label}>Horraire</Text>
        <View style={styles.horaire}>
          <TouchableOpacity style={styles.time} onPress={() => showPicker('time', 'open')}>
            <Text style={styles.time_text}>{open.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.time} onPress={() => showPicker('time', 'close')}>
            <Text style={styles.time_text}>{close.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          {isPickerShow && (
            <DateTimePicker
              value={pickerTarget === 'open' ? open : close}
              mode={mode}
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
            />
          )}
        </View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btn_text}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 170,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey'
  },
  profil: {
    height: 100,
    width: 100,
    borderColor: 'grey',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'grey'
  },
  forms: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: '90%',
    height: 40,
    borderRadius: 8,
    borderColor: 'grey',
    paddingLeft: 10
  },
  label: {
    width: "90%",
    marginBottom: 5,
    marginTop: 5
  },
  btn: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    height: 40,
    borderRadius: 8
  },
  btn_text: {
    color: '#fff',
    fontSize: 18
  },
  horaire: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%'
  },
  time: {
    borderWidth: 1,
    width: '45%',
    height: 40,
    borderRadius: 8,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icones: {
    color: 'grey',
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
    borderColor: 'grey',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default ModifyStore;
