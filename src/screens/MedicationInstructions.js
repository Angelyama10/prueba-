import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MedicationHeader from '../components/MedicationHeader'; // Importa el componente de cabecera
import MedicationOption from '../components/MedicationOption'; // Importa el componente de opciones

const { width, height } = Dimensions.get('window');

const MedicationInstructions = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento, 300mg'; // Obtén el nombre del medicamento desde los parámetros

  return (
    <SafeAreaView style={styles.container}>
      {/* Usa el componente MedicationHeader */}
      <MedicationHeader
        navigation={navigation}
        title={medicamentoNombre}
        iconName="document-text" // Cambiamos el ícono a "document-text" como se ve en la imagen
        questionText="¿Debe tomarse con alimentos?"
      />

      <View style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Opciones de alimentos */}
          <MedicationOption optionText="Antes de comer" onPress={() => {}} />
          <MedicationOption optionText="Con la comida" onPress={() => {}} />
          <MedicationOption optionText="Después de comer" onPress={() => {}} />
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
