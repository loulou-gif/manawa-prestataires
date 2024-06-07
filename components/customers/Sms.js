import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { sms } from '../../data/sms';
import Conversation from './Conversation';
import { scale, verticalScale } from 'react-native-size-matters';

// Fonction pour tronquer le texte
const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const Sms = () => {
  const [details, setDetails] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleVisible = (conversation) => {
    setSelectedConversation(conversation);
    setDetails(!details);
  };

  return (
    <View>
      {sms.map((d) => (
        <TouchableOpacity 
          key={d.id} 
          style={styles.card} 
          onPress={() => handleVisible(d)}
        >
          <Image style={styles.image} source={d.pp} />
          <View style={styles.info}>
            <Text style={styles.name}>{d.name}</Text>
            <Text style={styles.message}>{truncateText(d.text, 50)}</Text>
          </View>
          <View style={styles.time_box}>
            <Text style={styles.time}>{d.time}</Text>
          </View>
        </TouchableOpacity>
      ))}
      
      <Modal animationType="slide" transparent={true} visible={details}>
        <View style={styles.modalContainer}>
          {details && selectedConversation && (
            <Conversation d={selectedConversation} onClose={handleVisible} />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#ABA9A9',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: verticalScale(70),
    alignItems: 'center',
  },
  image: {
    width: scale(45),
    height: verticalScale(45),
    backgroundColor: '#ABA9A9',
    borderRadius: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  name: {
    fontSize: 16,
    color: '#47300D',
  },
  message: {
    fontSize: 14,
    color: '#ABA9A9',
  },
  time_box: {
    width: scale(75),
    alignItems: 'center',
    height: verticalScale(40),
    justifyContent: 'flex-end',
  },
  time: {
    fontSize: scale(12),
    color: '#ABA9A9',
  },
  info: {
    flex: 1, // to take up the remaining space in the row
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sms;
