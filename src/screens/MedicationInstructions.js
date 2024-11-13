import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicationHeader from '../components/MedicationHeader';
import MedicationOption from '../components/MedicationOption';

const { width, height } = Dimensions.get('window');

const MedicationInstructions = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento, 300mg';

  // Función para guardar el momento de la comida en AsyncStorage
  const handleSaveMealTime = async (momentoComida) => {
    try {
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      const parsedData = storedData ? JSON.parse(storedData) : [];
  
      // Actualizar el medicamento con el momento de la comida en cada dosis
      const updatedData = parsedData.map((medicamento) => {
        if (medicamento.nombre === medicamentoNombre) {
          return { 
            ...medicamento, 
            dosis: medicamento.dosis.map(d => ({ ...d, momento_comida: momentoComida }))
          };
        }
        return medicamento;
      });
  
      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify(updatedData));
      console.log('Momento de la comida guardado en AsyncStorage');
  
      // Usar JSON.stringify para mostrar todos los datos de manera expandida en consola
      const allData = await AsyncStorage.getItem('selectedMedicamentos');
      console.log('Todos los datos guardados:', JSON.stringify(JSON.parse(allData), null, 2));
  
      // Navegar a la pantalla AdditionalForm
      navigation.navigate('AdditionalForm', { medicamentoNombre });
    } catch (error) {
      console.error('Error guardando el momento de la comida:', error);
    }
  };  

  return (
    <SafeAreaView style={styles.container}>
      <MedicationHeader
        navigation={navigation}
        title={medicamentoNombre}
        iconName="document-text"
        questionText="¿Debe tomarse con alimentos?"
      />

      <View style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Opciones de alimentos */}
          <MedicationOption 
            optionText="Antes de comer" 
            onPress={() => handleSaveMealTime('Antes de comer')} 
          />
          <MedicationOption 
            optionText="Con la comida" 
            onPress={() => handleSaveMealTime('Con la comida')} 
          />
          <MedicationOption 
            optionText="Después de comer" 
            onPress={() => handleSaveMealTime('Después de comer')} 
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5D6FD', // Color de fondo azul en la parte superior
  },
  lowerSection: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Color de fondo blanco en la parte inferior
    borderTopLeftRadius: 30, // Bordes redondeados en la parte superior
    borderTopRightRadius: 30,
    paddingHorizontal: '5%',
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
  },
  scrollContent: {
    paddingBottom: height * 0.02,
  },
});

export default MedicationInstructions;
