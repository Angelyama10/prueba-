import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import SaveButton from '../components/SaveButton';

const { width, height } = Dimensions.get('window');

const TreatmentDuration = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento, 300mg';

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date.toLocaleDateString());
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={width * 0.06} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{medicamentoNombre}</Text>
        </View>
        <View style={styles.imageTextContainer}>
          <Icon name="calendar" size={width * 0.2} color="white" />
          <Text style={styles.instructionText}>Establecer fecha de inicio</Text>
        </View>
      </View>

      <View style={styles.lowerSection}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={showDatePicker} style={styles.dateContainer}>
            <Text style={styles.selectedDateText}>
              {selectedDate ? `Fecha seleccionada: ${selectedDate}` : 'Selecciona una fecha de inicio'}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <SaveButton
            buttonText="Guardar"
            onPress={() => navigation.navigate('DurationOfTreatment2', { medicamentoNombre })}
          />
        </View>
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
  instructionText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    marginTop: height * 0.01,
    textAlign: 'center',
    paddingHorizontal: '10%',
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
  dateContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
  },
  selectedDateText: {
    fontSize: width * 0.045,
    color: '#333',
  },
});

export default TreatmentDuration;
