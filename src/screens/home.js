import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateComponent from '../components/DateComponent';
import UsuarioIcon from '../../assets/images/usuario.svg';
import NavigationBarComponent from '../components/NavigationBarComponents';
import InfoSection from '../components/InfoSection';

const HomeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navItems = [
    { text: 'Inicio', iconName: 'home', onPress: () => console.log('Inicio presionado') },
    { text: 'Progreso', iconName: 'progreso', onPress: () => console.log('Progreso presionado') },
    { text: 'Medicamentos', onPress: () => console.log('Medicamentos presionado') },
    { text: 'Más', iconName: 'mas', onPress: () => console.log('Más presionado') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UsuarioIcon width={40} height={40} />
        <Text style={styles.headerText}>Alonso</Text>
      </View>
      
      <DateComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <InfoSection 
        imageSource={require('../../assets/images/calendario.jpg')}
        title="¡Cuidamos de Ti en Misalud!"
        description="Tu salud es nuestra prioridad. Comienza a registrar tu información para un mejor control y seguimiento."
        buttonText="Agregar Medicamento"
        onButtonPress={() => navigation.navigate('Search')}  // Asegúrate de que el nombre es "Search"
      />
      <NavigationBarComponent navItems={navItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    paddingVertical: '7%',
    backgroundColor: '#5A9BD3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },
  headerText: {
    fontSize: 20,
    marginLeft: '4%',
    color: '#FFFFFF',
  },
});

export default HomeScreen;
