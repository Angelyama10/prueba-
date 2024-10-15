import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import DateComponent from '../components/DateComponent';
import NavigationBarComponent from '../components/NavigationBarComponents';
import InfoSection from '../components/InfoSection';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouseMedicalCircleXmark, faUser } from '@fortawesome/free-solid-svg-icons';

// Solo UNA importación de MedicamentosList
import MedicamentosList from '../components/MedicamentosList'; 
import medicinasData from '../../assets/mockData/medicinas.json'; // Importar el archivo JSON

const { width, height } = Dimensions.get('window');

const Medicines = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hayMedicamentos, setHayMedicamentos] = useState(false); // Estado para controlar si hay medicamentos

  const navItems = [
    { text: 'Inicio', iconName: 'home-heart', onPress: () => navigation.navigate('Home') },
    { text: 'Progreso', iconName: 'chart-bar', onPress: () => console.log('Progreso presionado') },
    { text: 'Medicamentos', iconName: 'pill', onPress: () => console.log('Medicamentos presionado') },
    { text: 'Más', iconName: 'dots-horizontal', onPress: () => console.log('Más presionado') },
  ];

  // Efecto para verificar si hay medicamentos en el archivo JSON
  useEffect(() => {
    if (medicinasData.medicamentos && medicinasData.medicamentos.length > 0) {
      setHayMedicamentos(true); // Si hay medicamentos, mostramos la lista
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesomeIcon icon={faUser} size={24} color="#FFFFFF" />
        <Text style={styles.headerText}>Alonso</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Si hay medicamentos, mostramos la lista, si no, mostramos el InfoSection */}
        {hayMedicamentos ? (
          <MedicamentosList />  
        ) : (
          <InfoSection
            icon={<FontAwesomeIcon icon={faHouseMedicalCircleXmark} size={110} color="#5A9BD3" />}
            title="Empecemos"
            description="Agrega recordatorios para sus medicamentos, siga sus existencias y mucho más."
            buttonText="Agregar Medicamento"
            onButtonPress={() => navigation.navigate('Search')}
          />
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
    paddingBottom: 80, 
    marginTop: 20,
  },
});

export default Medicines;
