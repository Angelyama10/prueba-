import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import MedicationHeader from '../components/MedicationHeader';
import TimePickerRow from '../components/TimePickerRow';
import DosisInputRow from '../components/DosisInputRow';
import SaveButton from '../components/SaveButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { width, height } = Dimensions.get('window');

const TwiceaDay = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Nombre del medicamento';

  // Estados para las horas de las tomas y la dosis
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime1, setSelectedTime1] = useState('8:00 a.m.');
  const [selectedTime2, setSelectedTime2] = useState('8:00 p.m.');
  const [dosis1, setDosis1] = useState('1');
  const [dosis2, setDosis2] = useState('1');
  const [pickerType, setPickerType] = useState(null);

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
    } else {
      setSelectedTime2(formattedTime);
    }
    hideDatePicker();
  };

  // Función para guardar ambas dosis en AsyncStorage sin duplicar el array
  const handleSaveDoseTimes = async () => {
    try {
      // Obtener todos los medicamentos almacenados
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      const allMedicamentos = storedData ? JSON.parse(storedData) : [];

      // Encontrar el medicamento específico
      const updatedData = allMedicamentos.map((medicamento) => {
        if (medicamento.nombre === medicamentoNombre) {
          const existingDoses = Array.isArray(medicamento.dosis) ? medicamento.dosis : [];

          // Actualizar los horarios y cantidad en las dosis ya existentes, sin duplicar el array
          const updatedDoses = [
            {
              numero_dosis: 1,
              hora_dosis: selectedTime1,
              cantidadP: parseInt(dosis1, 10),
              momento_comida: 'antes', // Ajustar según la lógica de la app
            },
            {
              numero_dosis: 2,
              hora_dosis: selectedTime2,
              cantidadP: parseInt(dosis2, 10),
              momento_comida: 'antes', // Ajustar también según sea necesario
            },
          ];

          // Retornar el medicamento actualizado sin duplicar `dosis`
          return {
            ...medicamento,
            numero_dosis: updatedDoses.length, // Actualiza el número de dosis total
            dosis: updatedDoses,
          };
        }
        return medicamento;
      });

      // Guardar los datos actualizados en AsyncStorage
      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify(updatedData));
      console.log('Dosis actualizadas en AsyncStorage:', updatedData);

      Alert.alert('Éxito', 'Las dosis se guardaron correctamente.');
      navigation.navigate('AdditionalForm', { medicamentoNombre });
    } catch (error) {
      console.error('Error guardando las dosis:', error);
      Alert.alert('Error', 'Hubo un problema al guardar las dosis.');
    }
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
        {/* Primera Toma */}
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

        {/* Segunda Toma */}
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

        {/* Botón Guardar */}
        <SaveButton
          buttonText="Guardar"
          onPress={handleSaveDoseTimes}
        />
      </View>

      {/* DateTime Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour={false}
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: '5%',
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
  },
});

export default TwiceaDay;
