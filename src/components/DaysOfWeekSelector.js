import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DaysOfWeekSelector = ({ selectedDays, onDayPress }) => {
  const daysOfWeek = [
    { key: 'Dom', label: 'Dom' },
    { key: 'Lun', label: 'Lun' },
    { key: 'Mar', label: 'Mar' },
    { key: 'Mié', label: 'Mié' },
    { key: 'Jue', label: 'Jue' },
    { key: 'Vie', label: 'Vie' },
    { key: 'Sáb', label: 'Sáb' },
  ];

  return (
    
      
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day.key}
            style={[
              styles.dayButton,
              selectedDays.includes(day.key) && styles.dayButtonSelected,
            ]}
            onPress={() => onDayPress(day.key)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDays.includes(day.key) && styles.dayButtonTextSelected,
              ]}
            >
              {day.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
 
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#F8FBFF', // Fondo claro
    borderRadius: 12, // Bordes redondeados
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dayButton: {
    width: width * 0.11, // Tamaño más alargado para imitar la imagen original
    height: width * 0.15, // Ajustar la altura para hacerlos más ovalados
    backgroundColor: '#E0E0E0', // Fondo gris claro para los días no seleccionados
    borderRadius: 10, // Bordes más ovalados
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    margin: 1,
    marginTop: 10,
  },
  dayButtonSelected: {
    backgroundColor: '#B3D4F7', // Azul claro para los días seleccionados como en la imagen
  },
  dayButtonText: {
    color: '#333', // Texto gris para los días no seleccionados
    fontSize: width * 0.035, // Tamaño de fuente ajustado
    fontWeight: 'bold',
  },
  dayButtonTextSelected: {
    color: '#FFFFFF', // Texto blanco para los días seleccionados
  },
});

export default DaysOfWeekSelector;
