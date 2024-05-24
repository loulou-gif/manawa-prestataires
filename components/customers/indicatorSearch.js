// indicatorSearch.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const IndicatorSearch = () => {
  // const [searchPhrase, setSearchPhrase] = useState("");

  // const handleSearch = (text) => {
  //   setSearchPhrase(text);
  //   onChangeText(text);
  // };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        // value={searchPhrase}
        // onChangeText={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius:5
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width:'auto'
  },
});

export default IndicatorSearch;
