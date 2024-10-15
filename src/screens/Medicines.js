import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import DateComponent from '../components/DateComponent';
import NavigationBarComponent from '../components/NavigationBarComponents';
import InfoSection from '../components/InfoSection';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouseMedicalCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons'; // Agregar ícono de usuario

const { width, height } = Dimensions.get('window');

const Medicines = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navItems = [
    { text: 'Inicio', iconName: 'home-heart', onPress: () => navigation.navigate('Home') },
    { text: 'Progreso', iconName: 'chart-bar', onPress: () => navigation.navigate('Progress') },
    { text: 'Medicamentos', iconName: 'pill', onPress: () => console.log('Medicamentos presionado') },
    { text: 'Más', iconName: 'dots-horizontal', onPress: () => console.log('Más presionado') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Asegurarse de que el ícono esté en un contenedor separado y el texto esté en un <Text> */}
        <FontAwesomeIcon icon={faUser} size={24} color="#FFFFFF" />
        <Text style={styles.headerText}>Alonso</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <InfoSection
          icon={<FontAwesomeIcon icon={faHouseMedicalCircleXmark} size={110} color="#5A9BD3" />}
          title="Empecemos"
          description="Agrega recordatorios para sus medicamentos, siga sus existencias y mucho más."
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
    marginTop: 20,
  },
});

export default Medicines;
