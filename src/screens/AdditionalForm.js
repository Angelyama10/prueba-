import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicationOption from '../components/MedicationOption';
import SaveButton from '../components/SaveButton';
import { postMedicamentos } from '../services/medicamentos.service';

const { width, height } = Dimensions.get('window');

const AdditionalForm = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento, 300mg';
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Error obteniendo el token:', error);
    }
  };

  const handleSave = async () => {
    try {
      setIsButtonDisabled(true);
    
      const token = await getToken();
      if (!token) {
        Alert.alert('Error', 'Token no encontrado. Inicia sesión nuevamente.');
        setIsButtonDisabled(false);
        return;
      }
    
      // Obtener todos los medicamentos almacenados
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      const allMedicamentos = storedData ? JSON.parse(storedData) : [];
  
      // Encontrar el medicamento específico
      const dataMed = allMedicamentos.find(med => med.nombre === medicamentoNombre);
  
      if (!dataMed) {
        Alert.alert('Error', 'No se encontraron datos para este medicamento.');
        setIsButtonDisabled(false);
        return;
      }
  
      // Verificar que `dosis` contenga datos antes de enviar
      if (!Array.isArray(dataMed.dosis) || dataMed.dosis.length === 0) {
        Alert.alert('Error', 'No hay dosis guardadas para este medicamento.');
        setIsButtonDisabled(false);
        return;
      }
  
      console.log("Datos completos que se enviarán a la API:", JSON.stringify(dataMed, null, 2));
    
      // Enviar los datos a la API
      await postMedicamentos(token, dataMed);
    
      Alert.alert('Éxito', 'Datos enviados correctamente.');
      
      // Limpiar solo los datos del medicamento
      await AsyncStorage.removeItem('selectedMedicamentos');
      
      // Navegar a la pantalla Home
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar los datos.');
      console.error('Error al enviar datos:', error);
    } finally {
      setIsButtonDisabled(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{medicamentoNombre}</Text>
        </View>
      </View>

      <View style={styles.lowerSection}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text style={styles.instructionText}>Ya casi terminamos. ¿Le gustaría:</Text>

          {/* Opciones adicionales */}
          <MedicationOption
            iconName="calendar"
            optionText="Establecer la duración del tratamiento"
            onPress={() => navigation.navigate('TreatmentDuration', { medicamentoNombre })}
          />
          <MedicationOption
            iconName="alarm"
            optionText="Establecer recordatorio de recarga"
            onPress={() => navigation.navigate('RefillingMedications', { medicamentoNombre })}
          />
          <MedicationOption
            iconName="document-text"
            optionText="Agregar instrucciones"
            onPress={() => navigation.navigate('MedicationInstructions', { medicamentoNombre })}
          />

          {/* Botón de guardado */}
          <SaveButton
            buttonText="Guardar"
            onPress={handleSave}
            disabled={isButtonDisabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5D6FD',
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
    fontSize: width * 0.06,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: width * 0.03,
    flexShrink: 1,
  },
  imageTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.025,
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
    marginBottom: height * 0.015,
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
  instructionText: {
    fontSize: width * 0.045,
    color: '#6D6D6D',
    textAlign: 'center',
    marginBottom: height * 0.025,
  },
});

export default AdditionalForm;
