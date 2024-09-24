import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import MedicationOption from '../components/MedicationOption';
import SaveButton from '../components/SaveButton';

const { width, height } = Dimensions.get('window');

const AdditionalForm = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento, 300mg';
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
          <Image source={require('../../assets/images/pildoras.png')} style={styles.image} />
        </View>
      </View>

      <View style={styles.lowerSection}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text style={styles.instructionText}>Ya casi terminamos. ¿Le gustaría:</Text>

          <View>
            <MedicationOption
              iconName="calendar"
              optionText="Establecer la duración del tratamiento?"
              onPress={() => navigation.navigate('TreatmentDuration', { medicamentoNombre })}
            />

            <MedicationOption
              iconName="alarm"
              optionText="Establecer recordatorio de recarga?"
              onPress={() => navigation.navigate('RefillingMedications', { medicamentoNombre })}
            />

            <MedicationOption
              iconName="document-text"
              optionText="Agregar instrucciones"
              onPress={() => navigation.navigate('MedicationInstructions', { medicamentoNombre })}
            />
          </View>

          {/* Botón de guardar, controlado por isButtonDisabled */}
          <SaveButton
            buttonText="Guardar"
            onPress={() => {
              // Acción del botón Guardar
            }}
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
