import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import DateComponent from '../components/DateComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBarComponent from '../components/NavigationBarComponents';
import InfoSection from '../components/InfoSection';

const { width, height } = Dimensions.get('window');

const AgendaScreen = ({ navigation }) => {
  

  return (
    <View style={styles.container}>
      
      
      <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Agrega tus medicamentos</Text>
        </View>
        <Text style={styles.headerText}>Agenda</Text>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative', // Permite el posicionamiento absoluto de la barra de navegación
  },
  header: {
    width: '100%',
    paddingVertical: height * 0.05,
    backgroundColor: '#5A9BD3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  headerText: {
    fontSize: width * 0.06,
    marginLeft: '4%',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    paddingBottom: 80, // Espacio para la barra de navegación
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%', // Ajuste para que no quede pegado a los bordes
    marginBottom: 30,
  },
});

export default AgendaScreen;
