import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import MedicationOption from '../components/MedicationOption'; // Importamos el componente
import SaveButton from '../components/SaveButton'; // Importamos el botón de guardar

const { width } = Dimensions.get('window');

const AdditionalForm = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento, 300mg';
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Estado para controlar el botón

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <View style={styles.header}>
          <Icon name="arrow-back" size={24} color="white" onPress={() => navigation.goBack()} />
          <Text style={styles.title}></Text>
        </View>
        <View style={styles.imageTextContainer}>
          <Image source={require('../../assets/images/pildoras.png')} style={styles.image} />
          <Text style={styles.medicamentoText}>{medicamentoNombre}</Text>
        </View>
      </View>

      <View style={styles.lowerSection}>
        <Text style={styles.instructionText}>Ya casi terminamos. ¿Le gustaría:</Text>

        {/* Opciones con íconos personalizados */}
        <MedicationOption
          iconName="calendar" // Ícono personalizado
          optionText="Establecer la duración del tratamiento?"
          onPress={() => navigation.navigate('TreatmentDuration', { medicamentoNombre })}
        />

        <MedicationOption
          iconName="alarm" // Ícono personalizado
          optionText="Establecer recordatorio de recarga?"
          onPress={() => {
            // Acción cuando se selecciona esta opción
          }}
        />

        <MedicationOption
          iconName="document-text" // Ícono personalizado
          optionText="Agregar instrucciones"
          onPress={() => {
            // Acción cuando se selecciona esta opción
          }}
        />

        {/* Botón de guardar, controlado por isButtonDisabled */}
        <SaveButton
          buttonText="Guardar"
          onPress={() => {
            // Acción del botón Guardar
          }}
          disabled={isButtonDisabled} // Controlamos si el botón está deshabilitado
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5D6FD',
  },
  upperSection: {
    backgroundColor: '#B5D6FD',
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  imageTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  medicamentoText: {
    fontSize: 25,
    color: '#FFFFFF',
    marginTop: 5,
    textAlign: 'center',
  },
  lowerSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#6D6D6D',
    textAlign: 'center',
    marginBottom: 25,
  },
});

export default AdditionalForm;
