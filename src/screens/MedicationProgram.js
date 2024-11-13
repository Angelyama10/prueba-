import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import MedicationHeader from '../components/MedicationHeader'; // Componente de cabecera

const { width, height } = Dimensions.get('window');

// Componente para seleccionar un número (NumberSelector)
const NumberSelector = ({ label, value, onChangeValue, min, max }) => {
  const increment = () => {
    if (value < max) {
      onChangeValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChangeValue(value - 1);
    }
  };

  return (
    <View style={styles.numberSelectorContainer}>
      <Text style={styles.numberSelectorLabel}>{label}</Text>
      <View style={styles.numberSelectorControls}>
        <TouchableOpacity onPress={decrement} style={styles.numberSelectorButton}>
          <Text style={styles.numberSelectorButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.numberSelectorValue}>{value}</Text>
        <TouchableOpacity onPress={increment} style={styles.numberSelectorButton}>
          <Text style={styles.numberSelectorButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MedicationProgram = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Nombre del medicamento';

  const [isIntervaloActive, setIsIntervaloActive] = useState(true);
  const [isVariosActive, setIsVariosActive] = useState(false);
  const [isDiasActive, setIsDiasActive] = useState(false);
  const [isCiclicoActive, setIsCiclicoActive] = useState(false);

  const [intervalType, setIntervalType] = useState('horas');
  const [intervalValue, setIntervalValue] = useState('6');
  const [vecesAlDia, setVecesAlDia] = useState(1); // Estado para veces al día
  const [selectedDays, setSelectedDays] = useState(['Lun', 'Mié', 'Vie']); // Días seleccionados
  const [diasAdmision, setDiasAdmision] = useState(21); // Días de admisión
  const [diasPausa, setDiasPausa] = useState(7); // Días de pausa

  return (
    <SafeAreaView style={styles.container}>
      <MedicationHeader
        navigation={navigation}
        title={medicamentoNombre}
        iconName="alarm-outline"
      />

      <View style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.questionText}>
            ¿Cuál de estas opciones funciona para su horario de medicamentos?
          </Text>

                    {/* Opción Intervalo */}
                    <View style={styles.optionContainer}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Intervalo</Text>
              <Switch
                value={isIntervaloActive}
                onValueChange={() => setIsIntervaloActive(!isIntervaloActive)}
                style={styles.switch}
              />
            </View>
            <Text style={styles.optionSubtitle}>
              Por ejemplo, una vez cada dos días, una vez cada 6 horas
            </Text>
            {isIntervaloActive && (
              <View style={styles.innerOptionContainer}>
                <View style={styles.intervalTypeContainer}>
                  <TouchableOpacity
                    style={[
                      styles.intervalButton,
                      intervalType === 'horas' && styles.intervalButtonActive,
                    ]}
                    onPress={() => setIntervalType('horas')}
                  >
                    <Text style={styles.intervalButtonText}>Cada X horas</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.intervalButton,
                      intervalType === 'días' && styles.intervalButtonActive,
                    ]}
                    onPress={() => setIntervalType('días')}
                  >
                    <Text style={styles.intervalButtonText}>Cada X días</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Recordar cada</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={intervalValue}
                    onChangeText={setIntervalValue}
                  />
                  <Text style={styles.unitLabel}>{intervalType}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Opción Varias veces al día */}
<View style={styles.optionContainer}>
  <View style={styles.optionHeader}>
    <Text style={styles.optionTitle}>Varias veces al día</Text>
    <Switch
      value={isVariosActive}
      onValueChange={(value) => {
        setIsVariosActive(value);
        if (value) {
          setIsIntervaloActive(false);
          setIsDiasActive(false);
          setIsCiclicoActive(false);
        }
      }}
      style={styles.switch}
    />
  </View>
  <Text style={styles.optionSubtitle}>
    Por ejemplo, 3 o más veces al día
  </Text>
  {isVariosActive && (
    <View style={styles.innerOptionContainer}>
      <NumberSelector
        label="¿Cuántas veces al día?"
        value={vecesAlDia}
        onChangeValue={setVecesAlDia}
        min={3}
        max={10}
      />
    </View>
  )}
</View>
          {/* Opción Días específicos */}
          <View style={styles.optionContainer}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Días específicos de la semana</Text>
              <Switch
                value={isDiasActive}
                onValueChange={(value) => {
                  setIsDiasActive(value);
                  if (value) {
                    setIsIntervaloActive(false);
                    setIsVariosActive(false);
                    setIsCiclicoActive(false);
                  }
                }}
                style={styles.switch}
              />
            </View>
            <Text style={styles.optionSubtitle}>
              Por ejemplo, lunes, miércoles y viernes
            </Text>
            {isDiasActive && (
              <View style={styles.innerOptionContainer}>
                <DaysOfWeekSelector
                  selectedDays={selectedDays}
                  onDayPress={(day) => {
                    if (selectedDays.includes(day)) {
                      setSelectedDays(selectedDays.filter((d) => d !== day));
                    } else {
                      setSelectedDays([...selectedDays, day]);
                    }
                  }}
                />
              </View>
            )}
          </View>

          {/* Opción Modo cíclico */}
          <View style={styles.optionContainer}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Modo cíclico</Text>
              <Switch
                value={isCiclicoActive}
                onValueChange={(value) => {
                  setIsCiclicoActive(value);
                  if (value) {
                    setIsIntervaloActive(false);
                    setIsVariosActive(false);
                    setIsDiasActive(false);
                  }
                }}
                style={styles.switch}
              />
            </View>
            <Text style={styles.optionSubtitle}>
              Por ejemplo, 21 días de admisión, 7 días de pausa
            </Text>
            {isCiclicoActive && (
              <View style={styles.innerOptionContainer}>
                <View style={styles.selectorContainer}>
                  <Text style={styles.label}>Días de admisión</Text>
                  <Picker
                    selectedValue={diasAdmision}
                    onValueChange={(itemValue) => setDiasAdmision(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    {[...Array(31).keys()].map((day) => (
                      <Picker.Item key={day} label={`${day + 1}`} value={day + 1} />
                    ))}
                  </Picker>
                  <Text style={styles.unitLabel}>días</Text>
                </View>

                <View style={styles.selectorContainer}>
                  <Text style={styles.label}>Días de pausa</Text>
                  <Picker
                    selectedValue={diasPausa}
                    onValueChange={(itemValue) => setDiasPausa(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    {[...Array(15).keys()].map((day) => (
                      <Picker.Item key={day} label={`${day + 1}`} value={day + 1} />
                    ))}
                  </Picker>
                  <Text style={styles.unitLabel}>días</Text>
                </View>
              </View>
            )}
          </View>

         {/* Botón Próximo */}

         <TouchableOpacity
  style={styles.button}
  onPress={async () => {
    const jsonData = {
      nombre: medicamentoNombre,
      unidad: 'Tableta', // Puedes reemplazar según corresponda
      total_unidades: 10,
      unidades_restantes: 10,
      unidades_min: 8,
      frecuencia: '',
      numero_dosis: 1,
      dosis: [],
    };

    if (isIntervaloActive && intervalType === 'horas') {
      // Configuración para "Cada X horas"
      jsonData.frecuencia = `Cada ${intervalValue} horas`;
      jsonData.dosis.push({
        numero_dosis: 1,
        hora_dosis: `${intervalValue}:00`, // Puedes ajustar el formato
        cantidadP: 1, // Ajusta según la cantidad configurada
      });

      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify([jsonData]));
      navigation.navigate('ReminderSettings', {
        medicamentoNombre,
        intervalValue,
      });

    } else if (isIntervaloActive && intervalType === 'días') {
      // Configuración para "Cada X días"
      jsonData.frecuencia = `Cada ${intervalValue} días`;
      jsonData.dosis.push({
        numero_dosis: 1,
        hora_dosis: '08:00', // Puedes ajustar el formato
        cantidadP: 1, // Ajusta según la cantidad configurada
      });

      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify([jsonData]));
      navigation.navigate('DailyReminderSettings', {
        medicamentoNombre,
        intervalValue,
      });

    } else if (isVariosActive) {
      // Configuración para "Varias veces al día"
      jsonData.frecuencia = `Varias veces al día`;
      jsonData.numero_dosis = vecesAlDia;

      const startHour = 8;
      const interval = Math.floor(24 / vecesAlDia);
      for (let i = 0; i < vecesAlDia; i++) {
        const hour = (startHour + i * interval) % 24;
        const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
        jsonData.dosis.push({
          numero_dosis: i + 1,
          hora_dosis: formattedHour,
          cantidadP: 1, // Ajusta según la cantidad configurada
        });
      }

      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify([jsonData]));
      navigation.navigate('AdditionalForm', { medicamentoNombre });
      
    } else {
      // Guardar y navegar a AdditionalForm si ninguna de las opciones está activa
      await AsyncStorage.setItem('selectedMedicamentos', JSON.stringify([jsonData]));
      navigation.navigate('AdditionalForm', { medicamentoNombre });
    }
  }}
>
  <Text style={styles.buttonText}>Próximo</Text>
</TouchableOpacity>


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
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    paddingHorizontal: '5%',
    paddingTop: height * 0.02,
  },
  scrollContent: {
    paddingBottom: height * 0.05,
  },
  questionText: {
    fontSize: width * 0.045,
    color: '#333',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  optionContainer: {
    backgroundColor: '#FFF',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    borderRadius: 12,
    elevation: 3,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: width * 0.045,
    color: '#333',
    fontWeight: 'bold',
  },
  optionSubtitle: {
    fontSize: width * 0.04,
    color: '#666',
    marginTop: height * 0.01,
  },
  innerOptionContainer: {
    marginTop: height * 0.02,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  button: {
    backgroundColor: '#B5D6FD',
    paddingVertical: height * 0.02,
    borderRadius: width * 0.06,
    alignItems: 'center',
    marginTop: height * 0.03,
    marginBottom: height * 0.05,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  intervalTypeContainer: {
    flexDirection: 'row',
    marginVertical: height * 0.01,
  },
  intervalButton: {
    flex: 1,
    paddingVertical: height * 0.015,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B5D6FD',
    marginHorizontal: 5,
  },
  intervalButtonActive: {
    backgroundColor: '#B5D6FD',
  },
  intervalButtonText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  input: {
    width: 50,
    borderColor: '#B5D6FD',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    paddingVertical: height * 0.005,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    backgroundColor: '#EDF3FF',
  },
  label: {
    fontSize: width * 0.045,
    color: '#333',
  },
  unitLabel: {
    fontSize: width * 0.04,
    color: '#666',
  },
  numberSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  numberSelectorLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  numberSelectorControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberSelectorButton: {
    backgroundColor: '#B5D6FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  numberSelectorButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  numberSelectorValue: {
    fontSize: 16,
    color: '#333',
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  picker: {
    flex: 1,
    height: height * 0.05,
    backgroundColor: '#EDF3FF',
    borderRadius: 8,
    marginHorizontal: width * 0.02,
  },
});

export default MedicationProgram;
