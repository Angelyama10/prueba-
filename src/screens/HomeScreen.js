import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import DateComponent from '../components/DateComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBarComponent from '../components/NavigationBarComponents';
import HomeDatos from './HomeDatos';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hasMedicamentos, setHasMedicamentos] = useState(false);

  const navItems = [
    { text: 'Inicio', iconName: 'home-heart', onPress: () => navigation.navigate('Home') },
    { text: 'Progreso', iconName: 'chart-bar', onPress: () => navigation.navigate('Progress') },
    { text: 'Medicamentos', iconName: 'pill', onPress: () => navigation.navigate('HomeDatos') },
    { text: 'Más', iconName: 'dots-horizontal', onPress: () => console.log('Más presionado') },
  ];

  const handleDataAvailable = () => {
    console.log("Ejecutando handleDataAvailable, se llamará setHasMedicamentos(true)");
    setHasMedicamentos(true);
  };

  console.log("Valor de hasMedicamentos:", hasMedicamentos);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={width * 0.1} color="#FFFFFF" />
        <Text style={styles.headerText}>Alonso Inicio </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <DateComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        
        {hasMedicamentos ? (
          <HomeDatos
            navItems={navItems}
            navigation={navigation}
            onDataAvailable={handleDataAvailable}
          />
        ) : (
          <View style={styles.infoSectionContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/images/calendario.jpg')} style={styles.image} />
            </View>
            <Text style={styles.infoTitle}>¡Cuidamos de Ti en Misalud!</Text>
            <Text style={styles.infoDescription}>
              Tu salud es nuestra prioridad. Comienza a registrar tu información para un mejor control y seguimiento.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Search')}
            >
              <Text style={styles.buttonText}>Agregar Medicamento</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      <NavigationBarComponent navItems={navItems} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  header: {
    width: '100%',
    paddingVertical: height * 0.05,
    backgroundColor: '#5A9BD3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  headerText: {
    fontSize: width * 0.06,
    marginLeft: '4%',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 100,
  },
  infoSectionContainer: {
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  image: {
    width: '70%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  infoDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#666666',
    marginBottom: '5%',
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

export default HomeScreen;
