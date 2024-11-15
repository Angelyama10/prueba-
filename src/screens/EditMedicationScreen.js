import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimePickerModal from '../components/TimePickerModal';
import ErrorModal from '../components/ErrorModal';
import { getMedicamentoById, updateMedicamento, deleteMedicamento } from '../services/medicamentos.service';

const EditMedicationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const medicamentoId = route.params?.id;

  // Estado del medicamento y otras variables
  const [medicamento, setMedicamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Estados adicionales para frecuencia y horas de toma
  const [selectedTime1, setSelectedTime1] = useState('');
  const [selectedTime2, setSelectedTime2] = useState('');
  const [selectedTime3, setSelectedTime3] = useState('');

  useEffect(() => {
    const fetchMedicamento = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error("Token no disponible");

        const data = await getMedicamentoById(token, medicamentoId);
        if (data) {
          setMedicamento(data);
        } else {
          Alert.alert('Error', 'No se encontraron datos para el medicamento');
        }
      } catch (error) {
        console.error('Error al obtener el medicamento:', error);
        Alert.alert('Error', 'No se pudo cargar la información del medicamento');
      } finally {
        setLoading(false);
      }
    };

    if (medicamentoId) {
      fetchMedicamento();
    }
  }, [medicamentoId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando datos del medicamento...</Text>
      </View>
    );
  }

  // Función para manejar cambios en los campos generales
  const handleInputChange = (field, value) => {
    setMedicamento((prevMedicamento) => ({
      ...prevMedicamento,
      [field]: field.includes("unidades") || field === "numero_dosis"
        ? value === '' ? '' : parseInt(value)
        : value,
    }));
  };

  // Función para manejar cambios específicos en el array de dosis
  const handleDosisChange = (field, value, index) => {
    const newDosis = [...medicamento.dosis];
    newDosis[index] = {
      ...newDosis[index],
      [field]: value === '' ? '' : parseInt(value), // Mantiene vacío si no hay valor
    };
    setMedicamento((prevMedicamento) => ({
      ...prevMedicamento,
      dosis: newDosis,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error("Token no disponible");

      await updateMedicamento(token, medicamentoId, medicamento);
      Alert.alert('Actualización', 'El medicamento ha sido actualizado');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar el medicamento:', error);
      setErrorMessage(error.message || 'Error al actualizar el medicamento');
      setErrorModalVisible(true);
    }
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error("Token no disponible");

      await deleteMedicamento(token, medicamentoId);
      Alert.alert('Eliminación', 'El medicamento ha sido eliminado');
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el medicamento:', error);
      setErrorMessage(error.message || 'Error al eliminar el medicamento');
      setErrorModalVisible(true);
    }
  };

  const onConfirm = (time) => {
    setVisible(false);
    if (currentPicker === 'primera') setSelectedTime1(time);
    if (currentPicker === 'segunda') setSelectedTime2(time);
    if (currentPicker === 'tercera') setSelectedTime3(time);
  };

  const showDatePicker = (picker) => {
    setCurrentPicker(picker);
    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ErrorModal 
        visible={errorModalVisible} 
        message={errorMessage} 
        onClose={() => setErrorModalVisible(false)} 
      />

      <View style={styles.headerButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Medicina</Text>
        <TouchableOpacity onPress={handleUpdate}>
          <Text style={styles.headerButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del medicamento</Text>
          <TextInput
            style={styles.input}
            value={medicamento.nombre || ''}
            onChangeText={(text) => handleInputChange('nombre', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Unidad</Text>
          <Picker
            selectedValue={medicamento.unidad}
            style={styles.picker}
            onValueChange={(itemValue) => handleInputChange('unidad', itemValue)}
          >
            <Picker.Item label="Tableta" value="Tableta" />
            <Picker.Item label="Cápsula" value="Cápsula" />
            <Picker.Item label="Jarabe" value="Jarabe" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Frecuencia</Text>
          <Picker
            selectedValue={medicamento.frecuencia}
            style={styles.picker}
            onValueChange={(itemValue) => handleInputChange('frecuencia', itemValue)}
          >
            <Picker.Item label="Una vez al día" value="Una vez al día" />
            <Picker.Item label="Dos veces al día" value="Dos veces al día" />
            <Picker.Item label="Tres veces al día" value="Tres veces al día" />
          </Picker>
        </View>

        {/* Opciones de tiempo basadas en la frecuencia */}
        {medicamento.frecuencia === 'Una vez al día' && (
          <TouchableOpacity style={styles.timePicker} onPress={() => showDatePicker('primera')}>
            <Text style={styles.timePickerText}>Tomar a las</Text>
            <Text style={styles.selectedTime}>{selectedTime1}</Text>
          </TouchableOpacity>
        )}

        {medicamento.frecuencia === 'Dos veces al día' && (
          <>
            <TouchableOpacity style={styles.timePicker} onPress={() => showDatePicker('primera')}>
              <Text style={styles.timePickerText}>Primera Toma</Text>
              <Text style={styles.selectedTime}>{selectedTime1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timePicker} onPress={() => showDatePicker('segunda')}>
              <Text style={styles.timePickerText}>Segunda Toma</Text>
              <Text style={styles.selectedTime}>{selectedTime2}</Text>
            </TouchableOpacity>
          </>
        )}

        {medicamento.frecuencia === 'Tres veces al día' && (
          <>
            <TouchableOpacity style={styles.timePicker} onPress={() => showDatePicker('primera')}>
              <Text style={styles.timePickerText}>Primera Toma</Text>
              <Text style={styles.selectedTime}>{selectedTime1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timePicker} onPress={() => showDatePicker('segunda')}>
              <Text style={styles.timePickerText}>Segunda Toma</Text>
              <Text style={styles.selectedTime}>{selectedTime2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timePicker} onPress={() => showDatePicker('tercera')}>
              <Text style={styles.timePickerText}>Tercera Toma</Text>
              <Text style={styles.selectedTime}>{selectedTime3}</Text>
            </TouchableOpacity>
          </>
        )}

        <TimePickerModal
          visible={visible}
          onDismiss={() => setVisible(false)}
          onConfirm={onConfirm}
          label="Selecciona la hora"
        />

        {/* Campos numéricos adicionales */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de dosis</Text>
          <TextInput
            style={styles.input}
            value={medicamento.numero_dosis?.toString() || ''}
            onChangeText={(text) => handleInputChange('numero_dosis', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Total de unidades</Text>
          <TextInput
            style={styles.input}
            value={medicamento.total_unidades?.toString() || ''}
            onChangeText={(text) => handleInputChange('total_unidades', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Unidades restantes</Text>
          <TextInput
            style={styles.input}
            value={medicamento.unidades_restantes?.toString() || ''}
            onChangeText={(text) => handleInputChange('unidades_restantes', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Unidades mínimas</Text>
          <TextInput
            style={styles.input}
            value={medicamento.unidades_min?.toString() || ''}
            onChangeText={(text) => handleInputChange('unidades_min', text)}
            keyboardType="numeric"
          />
        </View>

              {/* Campos de dosis */}
      {medicamento.dosis && medicamento.dosis.map((dosis, index) => (
        <View key={dosis.id}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora de la dosis {index + 1}</Text>
            <TextInput
              style={styles.input}
              value={dosis.hora_dosis || ''}
              onChangeText={(text) => handleDosisChange('hora_dosis', text, index)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cantidad por dosis {index + 1}</Text>
            <TextInput
              style={styles.input}
              value={dosis.cantidadP?.toString() || ''}
              onChangeText={(text) => handleDosisChange('cantidadP', text, index)}
              keyboardType="numeric"
            />
          </View>
        </View>
      ))}

      {/* Botones de acción */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.suspendButton}
          onPress={() => Alert.alert('Medicamento suspendido')}
        >
          <Text style={styles.suspendButtonText}>Suspender</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => Alert.alert(
            'Confirmación',
            '¿Estás seguro de que deseas eliminar este medicamento?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', onPress: handleDelete, style: 'destructive' }
            ]
          )}
        >
          <Text style={styles.deleteButtonText}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    borderColor: '#B0BEC5',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 6,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 16,
  },
  suspendButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#1976D2',
    width: '45%',
    alignItems: 'center',
  },
  suspendButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#D32F2F',
    width: '45%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EditMedicationScreen;
