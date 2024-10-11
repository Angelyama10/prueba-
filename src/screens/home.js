import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import DateComponent from '../components/DateComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBarComponent from '../components/NavigationBarComponents';
import InfoSection from '../components/InfoSection';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navItems = [
    { text: 'Inicio', iconName: 'home-heart', onPress: () => console.log('Inicio presionado') },
    { text: 'Progreso', iconName: 'chart-bar', onPress: () => console.log('Progreso presionado') },
    { text: 'Medicamentos', iconName: 'pill', onPress: () => console.log('Medicamentos presionado') },
    { text: 'Más', iconName: 'dots-horizontal', onPress: () => console.log('Más presionado') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={width * 0.1} color="#FFFFFF" />
        <Text style={styles.headerText}>Alonso</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <DateComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <InfoSection 
          imageSource={require('../../assets/images/calendario.jpg')}
          title="¡Cuidamos de Ti en Misalud!"
          description="Tu salud es nuestra prioridad. Comienza a registrar tu información para un mejor control y seguimiento."
          buttonText="Agregar Medicamento"
          onButtonPress={() => navigation.navigate('Search')}
        />
      </ScrollView>
      <NavigationBarComponent navItems={navItems} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative', // Permite el posicionamiento absoluto de la barra de navegación
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
    paddingBottom: 80, // Espacio para la barra de navegación
  },
});

export default HomeScreen;
