import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import SaveButton from '../components/SaveButton';

const { width, height } = Dimensions.get('window');

const RefillingMedications = ({ navigation }) => {
  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento, 300mg';
  // Estados para las cantidades de píldoras
  const [existencia, setExistencia] = useState('');
  const [limite, setLimite] = useState('');

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
          <Icon name="medkit" size={width * 0.2} color="white" />
          <Text style={styles.instructionText}>
            ¿Cuántas medicinas quieres que queden antes de recibir un recordatorio de recarga?
          </Text>
        </View>
      </View>

      <View style={styles.lowerSection}>
        <View style={styles.row}>
          <Text style={styles.label}>Existencia</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={existencia}
            onChangeText={setExistencia}
            placeholder="10"
          />
          <Text style={styles.subText}>Quedan pastilla(s)</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Límite</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={limite}
            onChangeText={setLimite}
            placeholder="5"
          />
          <Text style={styles.subText}>Quedan pastilla(s)</Text>
        </View>

        <SaveButton
          buttonText="Guardar"
          onPress={() => {
            // Acción al presionar "Guardar"
            navigation.navigate('AdditionalForm', { medicamentoNombre });
          }}
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
});

export default RefillingMedications;
