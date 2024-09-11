import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import MedicationHeader from '../components/MedicationHeader'; // Importa tu componente de cabecera
import MedicationOption from '../components/MedicationOption'; // Importa el componente de opciones
import SaveButton from '../components/SaveButton'; // Importa el componente del botón de guardar

const DurationOfTreatment2 = ({ navigation }) => {
  const medicamentoNombre = 'Loratadina, 300mg'; // Nombre del medicamento

  // Estado para controlar el campo de "Elige el número de días"
  const [selectedDays, setSelectedDays] = useState('');

  // Función para validar si el número es válido
  const isNumberValid = () => {
    return selectedDays.length > 0 && !isNaN(selectedDays); // Asegura que no esté vacío y sea un número
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Usa el componente MedicationHeader */}
      <MedicationHeader
        navigation={navigation}
        title={medicamentoNombre}
        iconName="calendar"
        questionText="¿Cuánto tiempo dura el tratamiento?"
      />

      <KeyboardAvoidingView behavior="padding" style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Opciones de duración */}
          <MedicationOption optionText="5 días" onPress={() => {}} />
          <MedicationOption optionText="1 semana" onPress={() => {}} />
          <MedicationOption optionText="10 días" onPress={() => {}} />
          <MedicationOption optionText="30 días" onPress={() => {}} />

          {/* Opción de número de días personalizado */}
          <View style={styles.customOptionContainer}>
            <TextInput
              style={styles.customInput}
              placeholder="Elige el número de días"
              keyboardType="numeric"
              placeholderTextColor="#A0A0A0"
              value={selectedDays}
              onChangeText={setSelectedDays} // Actualiza el estado cada vez que el usuario escribe
            />
          </View>

          {/* Tratamiento en curso */}
          <MedicationOption optionText="Tratamiento en curso" onPress={() => {}} />
        </ScrollView>

        {/* Mostrar el botón Guardar solo si el campo de días está llenado */}
        {isNumberValid() && (
          <SaveButton
            buttonText="Guardar"
            onPress={() => {
              // Acción al presionar el botón de Guardar
              console.log(`Guardando con ${selectedDays} días.`);
            }}
          />
        )}
      </KeyboardAvoidingView>
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
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  customOptionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 25,
    marginBottom: 25,
  },
  customInput: {
    fontSize: 16,
    color: '#333',
  },
});

export default DurationOfTreatment2;
