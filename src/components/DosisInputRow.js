import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const DosisInputRow = ({ dosis, onChangeText, label }) => {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={dosis}
        onChangeText={onChangeText}
        placeholder="1"
      />
      <Text style={styles.subText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: '40%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
});

export default DosisInputRow;
