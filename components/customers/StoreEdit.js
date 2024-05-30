import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { app, db, collection, addDoc, getDoc, doc, setDoc, auth } from '../../firebase/configs';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const StoreEdit = ({ navigation, modif, setModif }) => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(new Date());
  const [close, setClose] = useState(new Date());
  const [banner, setBanner] = useState(null);
  const [profil, setProfil] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [pickerTarget, setPickerTarget] = useState(null);
  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const storeRef = doc(db, 'Store', userId);
        const storeDoc = await getDoc(storeRef);
        if (storeDoc.exists()) {
          const storeData = storeDoc.data();
          setName(storeData.name);
          setOpen(new Date(storeData.ouvert));
          setClose(new Date(storeData.fermé));
          setBanner(storeData.bannière);
          setProfil(storeData.profil);
          setStoreId(userId); // Set the storeId to the document ID
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la boutique: ', error);
      }
    };

    fetchStoreData();
  }, []);

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

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const source = result.assets[0].uri;
      setImage(source);
    }
  };

  const saveStoreData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const storeData = {
        id_prestataire: userId,
        name: name,
        ouvert: open.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fermé: close.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        bannière: banner,
        profil: profil,
      };

      if (storeId) {
        await setDoc(doc(db, 'Store', storeId), storeData);
      } else {
        const newStoreRef = await addDoc(collection(db, 'Store'), storeData);
        setStoreId(newStoreRef.id); // Set the storeId to the new document ID
      }

      setModif(!modif); // Remplacez 'SomeScreen' par l'écran de destination après la création
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Erreur Message: ', error);
    }
  };

  const handleVisible = () => {
    setModif(!modif);
  };

  return (
    <View style={styles.box}>
      <Text style={styles.titre}>MODIFIER SA BOUTIQUE</Text>
      <View style={styles.inputs}>
        <View style={styles.flex_input}>
          {banner && <Image style={styles.banner} source={{ uri: banner }} />}
          <TouchableOpacity style={styles.upload} onPress={() => pickImage(setBanner)}>
            <Text style={styles.btn}>Banner</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flex_input}>
          {profil && <Image style={styles.profil_input} source={{ uri: profil }} />}
          <TouchableOpacity style={styles.upload} onPress={() => pickImage(setProfil)}>
            <Text style={styles.btn}>Profil</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder='Nom de la boutique'
        />
        <View style={styles.flex}>
          <TouchableOpacity style={styles.time} onPress={() => showPicker('time', 'open')}>
            <Text>{open.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.time} onPress={() => showPicker('time', 'close')}>
            <Text>{close.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
        </View>
        {isPickerShow && (
          <DateTimePicker
            value={pickerTarget === 'open' ? open : close}
            mode={mode}
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
          />
        )}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <View style={styles.flex_input}>
          <TouchableOpacity onPress={saveStoreData} style={styles.save}>
            <Text style={styles.btn}>VALIDER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleVisible} style={styles.cancel}>
            <Text style={styles.btn}>ANNULER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '80%',
    height: 450,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titre: {
    textAlign: 'center',
    fontSize: 25,
  },
  inputs: {
    width: '90%',
    height: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: '65%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
  },
  upload: {
    width: '30%',
    height: '30%',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    color: '#fff',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ABA9A9',
    width: '85%',
    backgroundColor: '#fff',
    height: 40,
    paddingLeft: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  save: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: '35%',
  },
  cancel: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: '35%',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  flex_input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginTop: 15,
    marginBottom: 5,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 250,
    marginTop: 15,
    marginBottom: 5,
  },
  profil_input: {
    width: '40%',
    height: '95%',
    borderColor: '#ABA9A9',
    borderRadius: 8,
    borderWidth: 1,
  },
  time: {
    borderWidth: 1,
    borderColor: '#ABA9A9',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
  },
});

export default StoreEdit;
