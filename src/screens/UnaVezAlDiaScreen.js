import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native'; // Hook para recibir los parámetros
import { TimePickerModal } from 'react-native-paper-dates'; // TimePicker para la selección de la hora

const UnaVezAlDiaScreen = ({ navigation }) => {
  const route = useRoute();
  const { medicamentoNombre } = route.params; // Extraer el nombre del medicamento desde los parámetros
  const [visible, setVisible] = useState(false); // Controla la visibilidad del TimePicker
  const [selectedTime, setSelectedTime] = useState("10:00 AM"); // Estado para almacenar la hora seleccionada

  const onConfirm = ({ hours, minutes }) => {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const adjustedHour = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    setSelectedTime(`${adjustedHour}:${formattedMinutes} ${ampm}`);
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#B5D6FD" barStyle="light-content" />
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{medicamentoNombre}</Text>
        </View>
        <View style={styles.iconContainer}>
     
          <Ionicons name="alarm" size={65} color="white" />
          <Text style={styles.questionText}>¿Cuándo debe tomar la dosis?</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.timePicker} onPress={() => setVisible(true)}>
          <Text style={styles.timePickerText}>Tomar a las</Text>
          <Text style={styles.selectedTime}>{selectedTime}</Text>
        </TouchableOpacity>

        <TimePickerModal
          visible={visible}
          onDismiss={() => setVisible(false)}
          onConfirm={onConfirm}
          hours={10} // Hora por defecto
          minutes={0} // Minutos por defecto
          label="Selecciona la hora"
        />

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('AdditionalForm', { medicamentoNombre })}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5D6FD',
  },
  topContainer: {
    backgroundColor: '#B5D6FD',
    paddingBottom: 65,
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
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  questionText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 45,
    paddingHorizontal: 20,
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  timePickerText: {
    fontSize: 18,
    color: '#000',
  },
  selectedTime: {
    fontSize: 18,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#B5D6FD',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 180,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UnaVezAlDiaScreen;
