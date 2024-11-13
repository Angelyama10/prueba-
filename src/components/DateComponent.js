import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateComponent = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
  const dayNumber = today.getDate();
  const monthName = today.toLocaleDateString('es-ES', { month: 'long' });
  const hours = today.getHours();
  const minutes = today.getMinutes();
  
  // Asegúrate de que todo el texto esté envuelto en un componente <Text>
  const displayDate = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)}, ${dayNumber} de ${monthName} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  return (
    <View style={styles.dateDisplayContainer}>
      <Text style={styles.dateText}>{displayDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateDisplayContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    backgroundColor: '#F0F4FA',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default DateComponent;
