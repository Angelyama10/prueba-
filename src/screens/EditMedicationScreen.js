import React, { useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import MedicationHeader from '../components/MedicationHeader';

const EditMedicationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const medicamento = route.params?.medicamento || {
    nombre: "Amoxisilina5",
    unidad: "Tableta",
    frecuencia: "Diaria",
    numero_dosis: 1,
    total_unidades: 10,
    unidades_restantes: 10,
    unidades_min: 8,
    dosis: [
      {
        numero_dosis: 1,
        hora_dosis: "08:00",
        cantidadP: 2,
        momento_comida: "antes",
      }
    ],
  };

  const [nombre, setNombre] = useState(medicamento.nombre);
  const [unidad, setUnidad] = useState(medicamento.unidad);
  const [frecuencia, setFrecuencia] = useState(medicamento.frecuencia);
  const [numeroDosis, setNumeroDosis] = useState(medicamento.numero_dosis.toString());
  const [totalUnidades, setTotalUnidades] = useState(medicamento.total_unidades.toString());
  const [unidadesRestantes, setUnidadesRestantes] = useState(medicamento.unidades_restantes.toString());
  const [unidadesMin, setUnidadesMin] = useState(medicamento.unidades_min.toString());
  const [horaDosis, setHoraDosis] = useState(medicamento.dosis[0].hora_dosis);
  const [cantidadP, setCantidadP] = useState(medicamento.dosis[0].cantidadP.toString());
  const [momentoComida, setMomentoComida] = useState(medicamento.dosis[0].momento_comida);

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <MedicationHeader navigation={navigation} title="Editar Medicina" />

      {/* Header con opciones */}
      <View style={styles.headerButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Medicina</Text>
        <TouchableOpacity onPress={() => Alert.alert('Medicamento actualizado')}>
          <Text style={styles.headerButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Nombre del Medicamento */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del medicamento</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        {/* Unidad */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Unidad</Text>
          <TextInput
            style={styles.input}
            value={unidad}
            onChangeText={setUnidad}
          />
        </View>

        {/* Frecuencia */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Frecuencia</Text>
          <TextInput
            style={styles.input}
            value={frecuencia}
            onChangeText={setFrecuencia}
          />
        </View>

        {/* Número de dosis */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de dosis</Text>
          <TextInput
            style={styles.input}
            value={numeroDosis}
            onChangeText={setNumeroDosis}
            keyboardType="numeric"
          />
        </View>

        {/* Dosis */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora de la dosis</Text>
          <TextInput
            style={styles.input}
            value={horaDosis}
            onChangeText={setHoraDosis}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cantidad por dosis</Text>
          <TextInput
            style={styles.input}
            value={cantidadP}
            onChangeText={setCantidadP}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Momento de comida</Text>
          <TextInput
            style={styles.input}
            value={momentoComida}
            onChangeText={setMomentoComida}
          />
        </View>

        {/* Total de unidades y unidades restantes */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Total de unidades</Text>
          <TextInput
            style={styles.input}
            value={totalUnidades}
            onChangeText={setTotalUnidades}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Unidades restantes</Text>
          <TextInput
            style={styles.input}
            value={unidadesRestantes}
            onChangeText={setUnidadesRestantes}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Unidades mínimas</Text>
          <TextInput
            style={styles.input}
            value={unidadesMin}
            onChangeText={setUnidadesMin}
            keyboardType="numeric"
          />
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.suspendButton} onPress={() => Alert.alert('Medicamento suspendido')}>
            <Text style={styles.suspendButtonText}>Suspender</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => Alert.alert('Medicamento borrado')}>
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
    backgroundColor: '#F7F7F7',
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#B5D6FD',
  },
  headerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderColor: '#DDD',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  suspendButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    width: '45%',
    alignItems: 'center',
  },
  suspendButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FF3B30',
    width: '45%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default EditMedicationScreen;
