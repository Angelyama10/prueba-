import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MedicationHeader from '../components/MedicationHeader';  // Importa tu componente de cabecera
import MedicationOption from '../components/MedicationOption';  // Importa el nuevo componente de opción

const { width, height } = Dimensions.get('window');

const MedicationScreen = ({ navigation }) => {
  const route = useRoute();
  const { medicamentoNombre } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#B5D6FD" barStyle="light-content" />

      {/* Usa el componente MedicationHeader */}
      <MedicationHeader
        navigation={navigation}
        title={medicamentoNombre}
        iconName="calendar"
        questionText="¿Con qué frecuencia toma este medicamento?"
      />

      <View style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Usa el componente MedicationOption para cada opción */}
          <MedicationOption
            optionText="Una vez al día"
            onPress={() => navigation.navigate('UnaVezAlDiaScreen', { medicamentoNombre })}
          />
          
          <MedicationOption
            optionText="Dos veces al día"
            onPress={() => navigation.navigate('TwiceaDay', { medicamentoNombre })}
          />
          
          <MedicationOption
            optionText="3 veces al día"
            onPress={() => navigation.navigate('ThreeTimesADay', { medicamentoNombre })}
          />
          
          <MedicationOption
            optionText="Según sea necesario (sin recordatorio)"
            onPress={() => navigation.navigate('ScreenAsNeeded', { medicamentoNombre })}
          />
          
          <MedicationOption
            optionText="Otro"
            onPress={() => navigation.navigate('MedicationProgram', { medicamentoNombre })}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5D6FD',
  },
  lowerSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    paddingTop: height * 0.03,
    paddingHorizontal: '5%',
    paddingBottom: height * 0.02,
  },
});

export default MedicationScreen;
