import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // Mostrar la imagen por 3 segundos
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Homec.png')} style={styles.backgroundImage} />
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/home.jpg')} style={styles.image} />
        <Text style={styles.textMi}>MI</Text>
      </View>
      <Text style={styles.textSalud}>SALUD</Text>
      <Image source={require('../../assets/images/Homec1.png')} style={styles.bottomImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: -5, // Ajusta el valor según sea necesario
    left: -5, // Ajusta el valor según sea necesario
    width: 200, // Ajusta el valor según sea necesario
    height: 400, // Ajusta el valor según sea necesario
    resizeMode: 'cover',
    zIndex: -1,
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 500,  // Ajusta estos valores para hacer la imagen más grande
    height: 500, // Ajusta estos valores para hacer la imagen más grande
    resizeMode: 'contain', // Ajusta cómo se redimensiona la imagen
  },
  textMi: {
    position: 'absolute',
    fontSize: 45, // Ajusta el tamaño según sea necesario
    fontWeight: 'bold',
    color: '#000000', // Ajusta el color según sea necesario
    fontFamily: 'Yanone Kaffeesatz', // Asegúrate de tener esta fuente en tu proyecto
    top: '50%', // Ajusta la posición según sea necesario
    left: '50%',
    transform: [{ translateX: -98 }, { translateY: -10 }],
  },
  textSalud: {
    position: 'absolute',
    fontSize: 45, // Ajusta el tamaño según sea necesario
    fontWeight: 'bold',
    color: '#000000', // Ajusta el color según sea necesario
    fontFamily: 'Yanone Kaffeesatz', // Asegúrate de tener esta fuente en tu proyecto
    top: '50%', // Ajusta la posición según sea necesario
    left: '50%',
    transform: [{ translateX: -85 }, { translateY: 30 }],
  },
  bottomImage: {
    width: 300, // Ajusta el tamaño según sea necesario
    height: 100, // Ajusta el tamaño según sea necesario
    resizeMode: 'contain', // Ajusta cómo se redimensiona la imagen
    marginTop: 20,
  },
});

export default SplashScreen;
