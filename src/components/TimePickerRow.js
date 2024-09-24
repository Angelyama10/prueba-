// TimePickerRow.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const TimePickerRow = ({ selectedTime, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.time}>{selectedTime}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: width * 0.045,
    color: '#333',
  },
  time: {
    fontSize: width * 0.045,
    color: '#1E90FF',
  },
});

export default TimePickerRow;
