import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import MedicationHeader from '../components/MedicationHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const DailyMultipleReminders = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Nombre del medicamento';
  const vecesAlDia = route.params?.vecesAlDia || 1;

  const [dose, setDose] = useState('1');
  const [unit, setUnit] = useState('cápsula(s)');
  const [reminderTimes, setReminderTimes] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(null);

  // Función para generar tiempos distribuidos uniformemente a partir de las 8:00 AM
  const generateReminderTimes = () => {
    const startHour = 8;
    const interval = Math.floor(24 / vecesAlDia);
    const times = [];

    for (let i = 0; i < vecesAlDia; i++) {
      const hour = (startHour + i * interval) % 24;
      const amPm = hour < 12 || hour === 24 ? 'AM' : 'PM';
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      times.push(`${formattedHour}:00 ${amPm}`);
    }
    setReminderTimes(times);
  };

  useEffect(() => {
    generateReminderTimes();
  }, [vecesAlDia]);

  const updateReminderTime = (index, time) => {
    const newTimes = [...reminderTimes];
    newTimes[index] = time;
    setReminderTimes(newTimes);
  };

  const handleTimeChange = (event, selectedTime, index) => {
    setShowTimePicker(null);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      const amPm = hours < 12 || hours === 24 ? 'AM' : 'PM';
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
      updateReminderTime(index, `${formattedHour}:${minutes} ${amPm}`);
    }
  };

  const saveData = async () => {
    const json = {
      nombre: medicamentoNombre,
      unidad: unit,
      frecuencia: `Varias veces al día`,
      numero_dosis: vecesAlDia,
      total_unidades: 10,
      unidades_restantes: 10,
      unidades_min: 8,
      dosis: reminderTimes.map((time, index) => ({
        numero_dosis: index + 1,
        hora_dosis: time,
        cantidadP: parseInt(dose, 10),
      })),
    };

    try {
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      const allMedicamentos = storedData ? JSON.parse(storedData) : [];

      const updatedData = allMedicamentos.filter((med) => med.nombre !== medicamentoNombre);
      updatedData.push(json);

      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify(updatedData));
      console.log("Datos guardados en AsyncStorage:", JSON.stringify(json, null, 2));
    } catch (error) {
      console.error('Error al guardar los datos en AsyncStorage:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MedicationHeader navigation={navigation} title={medicamentoNombre} iconName="alarm-outline" />

      <View style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.questionText}>¿Cuándo quieres que te lo recuerden?</Text>
          <Text style={styles.subText}>Toma {vecesAlDia} veces al día</Text>

          <View style={styles.timeContainer}>
            {reminderTimes.map((time, index) => (
              <View key={index} style={styles.timeRow}>
                <TouchableOpacity style={styles.timeInput} onPress={() => setShowTimePicker(index)}>
                  <Text style={styles.timeText}>{time}</Text>
                </TouchableOpacity>
                <Text style={styles.doseText}>{dose} {unit}</Text>
                {showTimePicker === index && (
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => handleTimeChange(event, selectedDate, index)}
                  />
                )}
              </View>
            ))}
          </View>

          {/* Botón para guardar y navegar */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              saveData();
              navigation.navigate('DailyMultipleReminders', { medicamentoNombre });
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
    paddingVertical: height * 0.01,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  timeInput: {
    backgroundColor: '#F7F8FA',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: 8,
  },
  timeText: {
    fontSize: width * 0.04,
    color: '#C67C4E',
  },
  doseText: {
    fontSize: width * 0.04,
    color: '#C67C4E',
    fontWeight: 'bold',
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

export default DailyMultipleReminders;
