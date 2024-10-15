
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import MedicationOption from '../components/MedicationOption';
import SaveButton from '../components/SaveButton';

const { width, height } = Dimensions.get('window');

const DurationOfTreatment2 = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento, 300mg';

  const [selectedDays, setSelectedDays] = useState('');

  const isNumberValid = () => {
    return selectedDays.length > 0 && !isNaN(selectedDays);
  };

   return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={width * 0.06} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{medicamentoNombre}</Text>
        </View>
        <View style={styles.imageTextContainer}>
          <Icon name="calendar" size={width * 0.2} color="white" />
          <Text style={styles.questionText}>¿Cuánto tiempo dura el tratamiento?</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior="padding" style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Opciones de duración */}
          <MedicationOption optionText="5 días" onPress={() => handleSave('5 días')} />
          <MedicationOption optionText="1 semana" onPress={() => handleSave('1 semana')} />
          <MedicationOption optionText="10 días" onPress={() => handleSave('10 días')} />
          <MedicationOption optionText="30 días" onPress={() => handleSave('30 días')} />

          {/* Opción de número de días personalizado */}
          <View style={styles.customOptionContainer}>
            <TextInput
              style={styles.customInput}
              placeholder="Elige el número de días"
              keyboardType="numeric"
              placeholderTextColor="#A0A0A0"
              value={selectedDays}
              onChangeText={(text) => {
                setSelectedDays(text);
                setCustomDurationSelected(true); // Marca que una duración personalizada fue seleccionada
              }}
            />
          </View>

          {/* Tratamiento en curso */}
          <MedicationOption optionText="Tratamiento en curso" onPress={() => handleSave('Tratamiento en curso')} />
        </ScrollView>

        {/* Mostrar el botón Guardar si se seleccionó un número de días personalizado */}
        {(isNumberValid() || customDurationSelected) && (
          <SaveButton
            buttonText="Guardar"
            onPress={() => handleSave(selectedDays || 'Duración personalizada')}
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
  upperSection: {
    backgroundColor: '#B5D6FD',
    paddingBottom: height * 0.05,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingTop: height * 0.02,
    paddingBottom: height * 0.015,
  },
  title: {
    fontSize: width * 0.05,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: width * 0.03,
  },
  imageTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.02,
  },
  questionText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: height * 0.01,
    paddingHorizontal: '10%',
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
  customOptionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: height * 0.025,
    marginBottom: height * 0.025,
  },
  customInput: {
    fontSize: width * 0.045,
    color: '#333',
  },
});

export default DurationOfTreatment2;
