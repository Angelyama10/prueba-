import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRoute } from '@react-navigation/native';
import MedicationHeader from '../components/MedicationHeader'; // Importa el componente de cabecera
import TimePickerRow from '../components/TimePickerRow'; // Importa el componente para seleccionar horas
import DosisInputRow from '../components/DosisInputRow'; // Importa el componente para la dosis
import SaveButton from '../components/SaveButton'; // Importa el componente del botón de guardar

const { width, height } = Dimensions.get('window');

const ThreeTimesADay = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Nombre del medicamento';

  // Estados para las horas de las tomas y las dosis
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime1, setSelectedTime1] = useState('8:00 a.m.');
  const [selectedTime2, setSelectedTime2] = useState('2:00 p.m.');
  const [selectedTime3, setSelectedTime3] = useState('9:00 p.m.');
  const [dosis1, setDosis1] = useState('1');
  const [dosis2, setDosis2] = useState('1');
  const [dosis3, setDosis3] = useState('1');
  const [pickerType, setPickerType] = useState(null); // Identifica qué toma está seleccionando el usuario

  const showDatePicker = (toma) => {
    setPickerType(toma);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    if (pickerType === 'primera') {
      setSelectedTime1(formattedTime);
    } else if (pickerType === 'segunda') {
      setSelectedTime2(formattedTime);
    } else if (pickerType === 'tercera') {
      setSelectedTime3(formattedTime);
    }
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Usa el componente MedicationHeader */}
      <MedicationHeader
        navigation={navigation}
        title={medicamentoNombre}
        iconName="alarm-outline"
        questionText="¿Cuándo quieres que te lo recuerden?"
      />

      <View style={styles.lowerSection}>
        {/* Envuelve el contenido en un ScrollView */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Primera Toma */}
          <View style={styles.section}>
            <TimePickerRow
              selectedTime={selectedTime1}
              onPress={() => showDatePicker('primera')}
              label="Hora"
            />
            <DosisInputRow
              dosis={dosis1}
              onChangeText={setDosis1}
              label="Dosis (pastilla(s))"
            />
          </View>

          {/* Segunda Toma */}
          <View style={styles.section}>
            <TimePickerRow
              selectedTime={selectedTime2}
              onPress={() => showDatePicker('segunda')}
              label="Hora"
            />
            <DosisInputRow
              dosis={dosis2}
              onChangeText={setDosis2}
              label="Dosis (pastilla(s))"
            />
          </View>

          {/* Tercera Toma */}
          <View style={styles.section}>
            <TimePickerRow
              selectedTime={selectedTime3}
              onPress={() => showDatePicker('tercera')}
              label="Hora"
            />
            <DosisInputRow
              dosis={dosis3}
              onChangeText={setDosis3}
              label="Dosis (pastilla(s))"
            />
          </View>

          {/* Botón Próximo */}
          <SaveButton
            buttonText="Próximo"
            onPress={() => navigation.navigate('AdditionalForm', { medicamentoNombre })}
          />
        </ScrollView>
      </View>

      {/* DateTime Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour={false} // Formato de 12 horas
      />
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
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
  },
  scrollContent: {
    paddingBottom: height * 0.05, // Añade espacio al final para el botón
  },
  section: {
    marginBottom: height * 0.02,
  },
});

export default ThreeTimesADay;
