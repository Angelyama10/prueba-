import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const NumberSelector = ({ label, value, onChangeValue, min = 1, max = 24 }) => {
  const increment = () => {
    if (value < max) {
      onChangeValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChangeValue(value - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectorContainer}>
        <TouchableOpacity onPress={decrement} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.valueText}>{value}</Text>

        <TouchableOpacity onPress={increment} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: height * 0.02,
    backgroundColor: '#F0F8FF',
    borderRadius: width * 0.03,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
  },
  label: {
    fontSize: width * 0.045,
    color: '#333',
    marginBottom: height * 0.015,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
    backgroundColor: '#B5D6FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.08,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: width * 0.06,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default NumberSelector;
