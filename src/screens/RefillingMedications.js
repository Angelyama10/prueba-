import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import SaveButton from '../components/SaveButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import medicamentos from '../../assets/mockData/medicamentos.json';

const { width, height } = Dimensions.get('window');

const RefillingMedications = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento, 300mg';

  // Encontrar el medicamento en el archivo JSON
  const medicamento = medicamentos.find(med => med.nombre === medicamentoNombre);

  // Estados para las cantidades de píldoras
  const [existencia, setExistencia] = useState(medicamento ? medicamento.total_unidades.toString() : '');
  const [limite, setLimite] = useState('5');

  useEffect(() => {
    if (medicamento) {
      setExistencia(medicamento.total_unidades.toString());
    }
  }, [medicamento]);

  const handleSave = async () => {
    try {
      const storedData = await AsyncStorage.getItem('selectedMedicamentos');
      const parsedData = storedData ? JSON.parse(storedData) : [];
  
      // Actualizar el medicamento actual en la lista con unidades_restantes y unidades_min en el orden deseado
      const updatedData = parsedData.map((med) => {
        if (med.nombre === medicamentoNombre) {
          return {
            nombre: med.nombre,
            unidad: med.unidad,
            total_unidades: med.total_unidades,
            unidades_restantes: parseInt(existencia, 10),
            unidades_min: parseInt(limite, 10),
            numero_dosis: med.numero_dosis,
            frecuencia: med.frecuencia,
            dosis: med.dosis || [], // Asegurarse de que `dosis` es un array
          };
        }
        return med;
      });
  
      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify(updatedData));
      console.log('Datos guardados:', {
        nombre: medicamentoNombre,
        unidades_restantes: existencia,
        unidades_min: limite,
      });
  
      // Imprimir el estado completo en consola
      const allData = await AsyncStorage.getItem('selectedMedicamentos');
      console.log('Todos los datos guardados:', JSON.parse(allData));
  
      navigation.navigate('AdditionalForm', { medicamentoNombre });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ flex: 1, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={width * 0.06} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 24, marginLeft: 20 }}>{medicamentoNombre}</Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Icon name="medkit" size={width * 0.2} color="white" />
          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', marginTop: 10 }}>
            ¿Cuantas medicinas quieres que queden antes de recibir un recordatorio de recarga?
          </Text>
        </View>
      </View>

      <View style={{ flex: 2, padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ flex: 1, fontSize: 18 }}>Existencia</Text>
          <TextInput
            style={{ flex: 2, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 18 }}
            keyboardType="numeric"
            value={existencia}
            onChangeText={setExistencia}
            placeholder="10"
          />
          <Text style={{ flex: 1, fontSize: 16, color: '#888' }}>Quedan pastilla(s)</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ flex: 1, fontSize: 18 }}>Límite</Text>
          <TextInput
            style={{ flex: 2, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 18 }}
            keyboardType="numeric"
            value={limite}
            onChangeText={setLimite}
            placeholder="5"
          />
          <Text style={{ flex: 1, fontSize: 16, color: '#888' }}>Quedan pastilla(s)</Text>
        </View>

        <SaveButton
          buttonText="Guardar"
          onPress={handleSave}
        />
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
    fontSize: width * 0.05,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: width * 0.03,
    flexShrink: 1,
  },
  imageTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.02,
    paddingHorizontal: '5%',
  },
  instructionText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    marginTop: height * 0.01,
    textAlign: 'center',
    paddingHorizontal: '5%',
  },
  lowerSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: '5%',
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
  },
  label: {
    fontSize: width * 0.045,
    color: '#333',
    flex: 1,
  },
  input: {
    width: width * 0.15,
    height: height * 0.05,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: width * 0.045,
    color: '#333',
  },
  subText: {
    fontSize: width * 0.04,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
})

export default RefillingMedications;
