import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MedicationOption = ({ iconName, optionText, onPress }) => {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <View style={styles.optionContent}>
        <Ionicons name={iconName} size={35} color="#3DA2FF" />
        <Text style={styles.optionText}>{optionText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 25,
    marginBottom: 25,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default MedicationOption;
