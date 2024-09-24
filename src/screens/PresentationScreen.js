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
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MedicationScreen', { medicamentoNombre })}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
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
    paddingBottom: height * 0.05, // Ajustado para reducir espacio
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
  },
  imageTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.02,
  },
  image: {
    width: width * 0.2, // Reducido de 0.3 a 0.2
    height: width * 0.2, // Reducido de 0.3 a 0.2
    resizeMode: 'contain',
    marginBottom: height * 0.015,
  },
  questionText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: height * 0.01,
    paddingHorizontal: '10%',
  },
  lowerSection: {
    flex: 1, // Permite que Flexbox controle el espacio
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: '5%',
    paddingTop: height * 0.03,
    paddingBottom: height * 0.02,
  },
  dropdownContainer: {
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
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
    paddingVertical: height * 0.02,
    borderRadius: 25,
    alignItems: 'center',
    // marginTop: height * 0.05, // Eliminado para usar Flexbox
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default PresentationScreen;
