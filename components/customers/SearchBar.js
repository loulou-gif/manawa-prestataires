// SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const SearchBar = ({ onChangeText }) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSearch = (text) => {
    setSearchPhrase(text); 
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recherche..."
        value={searchPhrase}
        onChangeText={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: verticalScale(40),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
