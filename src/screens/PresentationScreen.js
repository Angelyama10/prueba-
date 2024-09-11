import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import PildorasImage from '../../assets/images/pildoras.png';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PresentationScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Pastillas');
  const [items, setItems] = useState([
    { label: 'Pastillas', value: 'Pastillas' },
    { label: 'Jarabe', value: 'Jarabe' },
    { label: 'Ampolla', value: 'Ampolla' },
  ]);

  const route = useRoute();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento';

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>{medicamentoNombre}</Text>
        </View>
        <View style={styles.imageTextContainer}>
          <Image source={PildorasImage} style={styles.image} />
          <Text style={styles.questionText}>¿En qué presentación viene el medicamento?</Text>
        </View>
      </View>
      <View style={styles.lowerSection}>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownMenu}
          />
        </View>
        {/* Redirigir a la pantalla MedicationScreen al hacer clic en Próximo */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MedicationScreen', { medicamentoNombre })}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
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
  imageTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
  lowerSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  dropdownContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  dropdown: {
    backgroundColor: '#F0F0F0',
    borderColor: '#ccc',
    borderRadius: 8,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#B5D6FD',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PresentationScreen;
