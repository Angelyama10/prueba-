import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicationHeader from '../components/MedicationHeader';

const { width, height } = Dimensions.get('window');

const ReminderSettings = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Nombre del medicamento';
  const intervalValue = route.params?.intervalValue || 6;
  const intervalo = route.params?.intervalo || 'horas';

  const [startTime, setStartTime] = useState('08:00');
  const [dose, setDose] = useState('2'); // Cantidad de dosis por defecto

  const saveMedicationData = async (data) => {
    try {
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      const allMedicamentos = storedData ? JSON.parse(storedData) : [];
      
      // Añadir o reemplazar la información del medicamento actual
      const updatedData = allMedicamentos.filter(med => med.nombre !== medicamentoNombre);
      updatedData.push(data);
      
      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify(updatedData));
      console.log("Datos guardados en AsyncStorage:", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al guardar los datos en AsyncStorage:', error);
    }
  };

  const generateFinalJson = () => {
    const json = {
      nombre: medicamentoNombre,
      unidad: 'Tableta',
      frecuencia: `Cada ${intervalValue} ${intervalo}`,
      numero_dosis: 1,
      total_unidades: 10,
      unidades_restantes: 10,
      unidades_min: 8,
      dosis: [
        {
          numero_dosis: 1,
          hora_dosis: startTime,
          cantidadP: parseInt(dose, 10),
        }
      ]
    };
    
    // Guardar los datos en AsyncStorage
    saveMedicationData(json);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MedicationHeader
        navigation={navigation}
        title={medicamentoNombre}
        iconName="alarm-outline"
      />

      <View style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.questionText}>¿Cuándo quieres que te lo recuerden?</Text>
          <Text style={styles.subText}>Toma cada {intervalValue} {intervalo}</Text>

          {/* Configuración de Horarios */}
          <View style={styles.timeContainer}>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Hora de la dosis</Text>
              <TextInput
                style={styles.timeInput}
                value={startTime}
                onChangeText={setStartTime}
                keyboardType="numeric"
                placeholder="08:00"
              />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Cantidad</Text>
              <TextInput
                style={styles.doseInput}
                value={dose}
                onChangeText={setDose}
                keyboardType="numeric"
                placeholder="2"
              />
            </View>
          </View>

          {/* Botón Siguiente */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              generateFinalJson();
              navigation.navigate('AdditionalForm', { medicamentoNombre });
            }}
          >
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
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
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    paddingHorizontal: '5%',
    paddingTop: height * 0.02,
  },
  scrollContent: {
    paddingBottom: height * 0.05,
  },
  questionText: {
    fontSize: width * 0.045,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  subText: {
    fontSize: width * 0.04,
    color: '#666',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  timeContainer: {
    backgroundColor: '#FFF',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    borderRadius: 12,
    marginBottom: height * 0.02,
    elevation: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  timeLabel: {
    fontSize: width * 0.045,
    color: '#333',
  },
  timeInput: {
    width: 70,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#EDF3FF',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: width * 0.04,
    color: '#333',
  },
  doseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doseInput: {
    width: 50,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#EDF3FF',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: width * 0.04,
    color: '#333',
  },
  doseUnitText: {
    fontSize: width * 0.045,
    color: '#333',
  },
  button: {
    backgroundColor: '#B5D6FD',
    paddingVertical: height * 0.02,
    borderRadius: width * 0.06,
    alignItems: 'center',
    marginTop: height * 0.03,
    marginBottom: height * 0.05,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default ReminderSettings;
