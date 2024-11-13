import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicationHeader from '../components/MedicationHeader';

const { width, height } = Dimensions.get('window');
const medicinas = require('../../assets/mockData/medicamentos.json');

const DailyReminderSettings = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Nombre del medicamento';
  const intervalValue = route.params?.intervalValue || '3';

  // Estados para los campos
  const [startTime, setStartTime] = useState('08:00');
  const [dose, setDose] = useState('1'); // Cantidad de dosis
  const [unit, setUnit] = useState('cápsula(s)'); // Unidad de dosis
  const [startDate, setStartDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Cargar la unidad de dosis en función del medicamento
  useEffect(() => {
    const medicamento = medicinas.find((med) => med.nombre === medicamentoNombre);
    if (medicamento) {
      setUnit(medicamento.unidad);
      setDose(medicamento.unidad === 'píldora' ? '1' : '20');
    }
  }, [medicamentoNombre]);

  // Formatear la fecha de inicio
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Guardar JSON en AsyncStorage
  const saveMedicationData = async (data) => {
    try {
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      const allMedicamentos = storedData ? JSON.parse(storedData) : [];

      const updatedData = allMedicamentos.filter((med) => med.nombre !== medicamentoNombre);
      updatedData.push(data);

      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify(updatedData));
      console.log("Datos guardados en AsyncStorage:", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al guardar los datos en AsyncStorage:', error);
    }
  };

  // Generar el JSON final y guardar en AsyncStorage
  const generateFinalJson = () => {
    const json = {
      nombre: medicamentoNombre,
      unidad: unit,
      frecuencia: `Cada ${intervalValue} días`,
      numero_dosis: 1,
      total_unidades: 10,
      unidades_restantes: 10,
      unidades_min: 8,
      dosis: [
        {
          numero_dosis: 1,
          hora_dosis: startTime,
          cantidadP: parseInt(dose, 10),
          fecha_inicio: formatDate(startDate),
        },
      ],
    };

    // Guardar en AsyncStorage
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
          <Text style={styles.subText}>Toma cada {intervalValue} días</Text>

          {/* Configuración de Horarios */}
          <View style={styles.timeContainer}>
            {/* Selector de Hora */}
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Hora</Text>
              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.timeText}>{startTime}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowTimePicker(false);
                    if (selectedDate) {
                      const hours = selectedDate.getHours();
                      const minutes = selectedDate.getMinutes();
                      setStartTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
                    }
                  }}
                />
              )}
            </View>

            {/* Dosis */}
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Dosis</Text>
              <View style={styles.doseRow}>
                <TextInput
                  style={styles.doseInput}
                  value={dose}
                  onChangeText={setDose}
                  keyboardType="numeric"
                />
                <Text style={styles.doseUnitText}>{unit}</Text>
              </View>
            </View>

            {/* Selector de Fecha de Inicio */}
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Fecha de inicio</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setStartDate(selectedDate);
                    }
                  }}
                />
              )}
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
    width: 80,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#EDF3FF',
    borderRadius: 8,
    textAlign: 'center',
  },
  timeText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  doseRow: {
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
    color: '#C67C4E',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dateInput: {
    width: 120,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#EDF3FF',
    borderRadius: 8,
    textAlign: 'center',
  },
  dateText: {
    fontSize: width * 0.04,
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

export default DailyReminderSettings;
