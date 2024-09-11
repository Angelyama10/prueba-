import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MedicationHeader from '../components/MedicationHeader';  // Importa tu componente de cabecera
import MedicationOption from '../components/MedicationOption';  // Importa el nuevo componente de opción

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
            onPress={() => navigation.navigate('ScreenTwiceADay')}
          />
          
          <MedicationOption
            optionText="3 veces al día"
            onPress={() => navigation.navigate('ScreenThreeTimesADay')}
          />
          
          <MedicationOption
            optionText="Según sea necesario (sin recordatorio)"
            onPress={() => navigation.navigate('ScreenAsNeeded')}
          />
          
          <MedicationOption
            optionText="Otro"
            onPress={() => navigation.navigate('ScreenOther')}
          />

         
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = {
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
    paddingTop: 30,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
};

export default MedicationScreen;
