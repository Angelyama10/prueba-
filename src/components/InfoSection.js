import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const InfoSection = ({ 
  imageSource, 
  title, 
  description, 
  buttonText, 
  onButtonPress 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.loginImage} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoText}>{description}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  loginImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1, 
    resizeMode: 'contain',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#666666',
  },
  button: {
    backgroundColor: '#5A9BD3',
    paddingVertical: '4%',
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InfoSection;
