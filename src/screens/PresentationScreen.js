import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import PildorasImage from '../../assets/images/pildoras.jpg';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PresentationScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Pastillas');
  const [items, setItems] = useState([
    { label: 'Pastillas', value: 'Pastillas' },
    { label: 'Jarabe', value: 'Jarabe' },
    { label: 'Ampolla', value: 'Ampolla' },
  ]);

  const route = useRoute();
  const navigation = useNavigation();
  const medicamentoNombre = route.params?.medicamentoNombre || 'Medicamento'; // Manejamos un valor por defecto

  return (
    <View style={styles.container}>
      {/* Header con ícono de retroceso y título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>{medicamentoNombre}</Text>
      </View>

      {/* Imagen e instrucción */}
      <View style={styles.imageContainer}>
        <Image source={PildorasImage} style={styles.image} />
        <Text style={styles.questionText}>¿En qué presentación viene el medicamento?</Text>
      </View>

      {/* Dropdown para seleccionar la presentación */}
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

      {/* Botón siguiente */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#B5D6FD',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 15,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  dropdownContainer: {
    paddingHorizontal: 20,
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
    marginHorizontal: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PresentationScreen;