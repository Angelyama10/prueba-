import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MedicationHeader = ({ navigation, title, iconName, questionText }) => {
  return (
    <View style={styles.upperSection}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.imageTextContainer}>
        <Ionicons name={iconName} size={65} color="white" style={styles.icon} />
        <Text style={styles.questionText}>{questionText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperSection: {
    backgroundColor: '#B5D6FD',
    paddingBottom: 65,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  imageTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  icon: {
    width: 80,
    height: 80,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
    marginLeft: 30,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    paddingRight: 20,
  },
});

export default MedicationHeader;
