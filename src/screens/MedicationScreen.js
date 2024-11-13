import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicationHeader from '../components/MedicationHeader';
import MedicationOption from '../components/MedicationOption';

const { height } = Dimensions.get('window');

const MedicationScreen = ({ navigation }) => {
  const route = useRoute();
  const { medicamentoNombre } = route.params;
  const [storedMedicamentos, setStoredMedicamentos] = useState([]);

  useEffect(() => {
    const loadStoredMedicamentos = async () => {
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      setStoredMedicamentos(storedData ? JSON.parse(storedData) : []);
    };
    loadStoredMedicamentos();
  }, []);

  // Función para guardar frecuencia y número de dosis seleccionada
  const handleSaveFrequency = async (numeroDosis, descripcion) => {
    try {
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      const parsedData = storedData ? JSON.parse(storedData) : [];

      // Actualizar medicamento con frecuencia y número de dosis
      const updatedData = parsedData.map((medicamento) => {
        if (medicamento.nombre === medicamentoNombre) {
          return { 
            ...medicamento, 
            numero_dosis: numeroDosis, 
            frecuencia: descripcion,
            dosis: medicamento.dosis || [] // Asegura que `dosis` está inicializado
          };
        }
        return medicamento;
      });

      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify(updatedData));
      console.log('Frecuencia guardada en AsyncStorage:', descripcion);
    } catch (error) {
      console.error('Error guardando la frecuencia:', error);
    }
  };

  // Función para añadir dosis al array de dosis existente
  const handleAddDoses = async (doses) => {
    try {
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      const parsedData = storedData ? JSON.parse(storedData) : [];

      const updatedData = parsedData.map((medicamento) => {
        if (medicamento.nombre === medicamentoNombre) {
          const existingDoses = medicamento.dosis || []; // Asegura que `dosis` es un array
          return {
            ...medicamento,
            dosis: [...existingDoses, ...doses], // Agrega nuevas dosis al final de `dosis`
          };
        }
        return medicamento;
      });

      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify(updatedData));
      console.log('Dosis añadidas en AsyncStorage:', doses);
    } catch (error) {
      console.error('Error añadiendo la dosis:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#B5D6FD" barStyle="light-content" />

      <MedicationHeader
        navigation={navigation}
        title={medicamentoNombre}
        iconName="calendar"
        questionText="¿Con qué frecuencia toma este medicamento?"
      />

      <View style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <MedicationOption
            optionText="Una vez al día"
            onPress={() => {
              handleSaveFrequency(1, 'Una vez al día');
              handleAddDoses([
                {
                  numero_dosis: 1,
                  hora_dosis: '08:00',
                  cantidadP: 1,
                  momento_comida: 'antes',
                }
              ]);
              navigation.navigate('UnaVezAlDiaScreen', { medicamentoNombre });
            }}
          />
          <MedicationOption
            optionText="Dos veces al día"
            onPress={() => {
              handleSaveFrequency(2, 'Dos veces al día');
              handleAddDoses([
                {
                  numero_dosis: 1,
                  hora_dosis: '08:00',
                  cantidadP: 1,
                  momento_comida: 'antes',
                },
                {
                  numero_dosis: 2,
                  hora_dosis: '20:00',
                  cantidadP: 1,
                  momento_comida: 'antes',
                }
              ]);
              navigation.navigate('TwiceaDay', { medicamentoNombre });
            }}
          />
          <MedicationOption
            optionText="Tres veces al día"
            onPress={() => {
              handleSaveFrequency(3, 'Tres veces al día');
              handleAddDoses([
                {
                  numero_dosis: 1,
                  hora_dosis: '08:00',
                  cantidadP: 1,
                  momento_comida: 'antes',
                },
                {
                  numero_dosis: 2,
                  hora_dosis: '14:00',
                  cantidadP: 1,
                  momento_comida: 'antes',
                },
                {
                  numero_dosis: 3,
                  hora_dosis: '20:00',
                  cantidadP: 1,
                  momento_comida: 'antes',
                }
              ]);
              navigation.navigate('ThreeTimesADay', { medicamentoNombre });
            }}
          />
          <MedicationOption
            optionText="Según sea necesario (sin recordatorio)"
            onPress={() => {
              navigation.navigate('ScreenAsNeeded', { medicamentoNombre });
            }}
          />
          <MedicationOption
            optionText="Otro"
            onPress={() => {
              navigation.navigate('MedicationProgram', { medicamentoNombre });
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5D6FD',
  },
  lowerSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: height * 0.03,
    paddingHorizontal: '5%',
    paddingBottom: height * 0.02,
  },
  scrollContent: {
    paddingBottom: height * 0.05,
  },
});

export default MedicationScreen;
