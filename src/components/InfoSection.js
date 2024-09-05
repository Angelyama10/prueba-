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
    <View>
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
  imageContainer: {
    marginVertical: '-3%',
    alignItems: 'center',
  },
  loginImage: {
    width: '75%',
    height: undefined,
    aspectRatio: 1, 
    resizeMode: 'contain',
  },
    infoContainer: {
      alignItems: 'center',
      marginHorizontal: '8%',
      marginBottom: '8%',
    },
    infoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
      color: '#000000',  // Negro en hexadecimal
    },
    infoText: {
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 8,
      lineHeight: 24,
      color: '#000000',  // Negro en hexadecimal
    },
  
  button: {
    backgroundColor: '#5A9BD3',
    paddingVertical: '4%',
    paddingHorizontal: '10%',
    borderRadius: 20,
    width: '70%',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default InfoSection;
