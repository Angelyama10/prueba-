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
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import MedicationHeader from '../components/MedicationHeader'; // Importa el componente de cabecera
import NumberSelector from '../components/NumberSelector'; // Componente para seleccionar número
import DaysOfWeekSelector from '../components/DaysOfWeekSelector'; // Componente para seleccionar días de la semana
import { Picker } from '@react-native-picker/picker'; // Componente Picker para seleccionar días en modo cíclico

const { width, height } = Dimensions.get('window');

const MedicationProgram = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Nombre del medicamento';

  const [isVariosActive, setIsVariosActive] = useState(false);
  const [isDiasActive, setIsDiasActive] = useState(false);
  const [isCiclicoActive, setIsCiclicoActive] = useState(false);
  const [vecesAlDia, setVecesAlDia] = useState(1); // Estado para el número de veces al día
  const [selectedDays, setSelectedDays] = useState(['Lun', 'Mié', 'Vie']); // Días seleccionados por defecto
  const [diasAdmision, setDiasAdmision] = useState(21); // Días de admisión predeterminados
  const [diasPausa, setDiasPausa] = useState(7); // Días de pausa predeterminados

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado con el nombre del medicamento */}
      <MedicationHeader
        navigation={navigation}
        title={medicamentoNombre}
        iconName="alarm-outline"
      />

      <View style={styles.lowerSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Texto de pregunta */}
          <Text style={styles.questionText}>
            ¿Cuál de estas opciones funciona para su horario de medicamentos?
          </Text>

          {/* Opción Intervalo */}
          <View style={styles.optionContainer}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Intervalo</Text>
              <Switch
                value={!isVariosActive && !isDiasActive && !isCiclicoActive}
                onValueChange={() => {
                  setIsVariosActive(false);
                  setIsDiasActive(false);
                  setIsCiclicoActive(false);
                }}
                style={styles.switch}
              />
            </View>
            <Text style={styles.optionSubtitle}>
              Por ejemplo, una vez cada dos días, una vez cada 6 horas
            </Text>
            {/* Aquí podrías incluir la configuración del intervalo si está activo */}
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
                    setIsDiasActive(false);
                    setIsCiclicoActive(false);
                  }
                }}
                style={styles.switch}
              />
            </View>
            <Text style={styles.optionSubtitle}>
              Por ejemplo, 4 o más veces al día
            </Text>
            {isVariosActive && (
              <View style={styles.innerOptionContainer}>
                <NumberSelector
                  label="tas veces al día?"
                  value={vecesAlDia}
                  onChangeValue={setVecesAlDia}
                  min={1}
                  max={24}
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
            onPress={() => navigation.navigate('AdditionalForm', { medicamentoNombre })}
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
    backgroundColor: '#B5D6FD', // Color de fondo azul para mantener consistencia
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
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  label: {
    fontSize: width * 0.045,
    color: '#333',
    flex: 1,
  },
  picker: {
    flex: 1,
    height: height * 0.05,
    backgroundColor: '#EDF3FF',
    borderRadius: 8,
    marginHorizontal: width * 0.02,
  },
  unitLabel: {
    fontSize: width * 0.04,
    color: '#666',
  },
});

export default MedicationProgram;
