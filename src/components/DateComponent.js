import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateComponent = () => {
  const today = new Date();

  const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
  const dayNumber = today.getDate();
  const monthName = today.toLocaleDateString('es-ES', { month: 'long' });

  const displayDate = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)}, ${dayNumber} de ${monthName}`;

  return (
    <View style={styles.dateDisplayContainer}>
      <Text style={styles.dateText}>{displayDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateDisplayContainer: {
    width: '60%', // Ajusta el ancho según tus necesidades
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    alignItems: 'flex-start',
    backgroundColor: '#F0F4FA',
    borderTopRightRadius: 25, // Redondea la esquina superior derecha
    borderBottomRightRadius: 25, // Redondea la esquina inferior derecha
  },
  dateText: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
});



export default DateComponent;
