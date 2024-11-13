// MedicationHeader.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const MedicationHeader = ({ navigation, title, iconName, questionText }) => {
  return (
    <View style={styles.upperSection}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={width * 0.06} color="white" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.imageTextContainer}>
        <Icon name={iconName} size={width * 0.2} color="white" />
        <Text style={styles.questionText}>{questionText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperSection: {
    backgroundColor: '#B5D6FD',
    paddingBottom: height * 0.05,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: height * 0.02,
    paddingBottom: height * 0.015,
  },
  title: {
    fontSize: width * 0.05,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: width * 0.03,
    flexShrink: 1,
  },
  imageTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.02,
  },
  questionText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: height * 0.01,
    paddingHorizontal: '10%',
  },
});

export default MedicationHeader;