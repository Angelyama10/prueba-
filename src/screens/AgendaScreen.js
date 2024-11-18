import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { sendAgendaData } from '../services/agenda.service'; // Importar correctamente la función

const { width, height } = Dimensions.get('window');

const AgendaScreen = ({ navigation }) => {
  const [nota, setNota] = useState('');
  const [selectedType, setSelectedType] = useState({ label: 'General', color: '#008080' });

  const handleAccept = async () => {
    if (!nota.trim()) {
      Alert.alert('Error', 'Por favor, escribe una anotación antes de guardar.');
      return;
    }

    try {
      // Preparar datos
      const fechaActual = new Date();
      const hora = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')} ${fechaActual
        .getHours()
        .toString()
        .padStart(2, '0')}:${fechaActual.getMinutes().toString().padStart(2, '0')}`;

      const agendaData = {
        nombre: nota.split(' ').slice(0, 4).join(' '), // Extraer las primeras 4 palabras
        descripcion: nota,
        hora,
        tipo: selectedType.label,
      };

      console.log('Datos preparados para enviar:', agendaData);

      // Enviar datos a la API
      const response = await sendAgendaData(agendaData);
      Alert.alert('Éxito', 'La anotación se ha enviado correctamente.');
      console.log('Respuesta del servidor:', response);

      navigation.navigate('Home'); // Regresar a la pantalla principal
    } catch (error) {
      console.error('Error al enviar la anotación:', error.message);
      Alert.alert('Error', 'No se pudo enviar la anotación. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Agrega Anotación</Text>
          <TouchableOpacity onPress={handleAccept}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>Anotación</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          onChangeText={(text) => setNota(text)}
          value={nota}
          placeholder="Escribe aquí tu anotación"
        />

        {/* Tipo de anotación */}
        <View style={styles.infoSection}>
          <TouchableOpacity
            style={styles.annotationRow}
            onPress={() => {
              setSelectedType({ label: 'Emergencia', color: '#FF0000' });
            }}
          >
            <Text style={styles.annotationTypeTitle}>Tipo</Text>
            <View style={styles.annotationTypeRow}>
              <View style={[styles.colorDot, { backgroundColor: selectedType.color }]} />
              <Text style={styles.annotationType}>{selectedType.label}</Text>
              <AntDesign name="right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Advertencia */}
        <Text style={styles.warningText}>
          Atención: La información que ingrese aquí es para su propia referencia. En caso de
          emergencia, por favor contacte a su servicio de emergencia local (911). También le
          recordamos que consulte a su médico sobre cualquier medicamento o cualquier pregunta que
          pueda tener sobre sus servicios de salud.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    paddingVertical: height * 0.05,
    backgroundColor: '#5A9BD3',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: width * 0.06,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  textInput: {
    borderColor: '#EAF2F8',
    backgroundColor: '#EAF2F8',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    height: 150,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
  infoSection: {
    marginTop: 20,
  },
  annotationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  annotationTypeTitle: {
    fontSize: 16,
    color: '#333',
  },
  annotationTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  annotationType: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginRight: 10,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  warningText: {
    marginTop: 20,
    fontSize: 14,
    color: 'red',
  },
});

export default AgendaScreen;
