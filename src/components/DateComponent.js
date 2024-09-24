import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateComponent = () => {
  const today = new Date();

  const displayDate = `Hoy, ${today.getDate()} ${today.toLocaleDateString('es-ES', { month: 'short' })}`;

  return (
    <View style={styles.dateDisplayContainer}>
      <Text style={styles.dateText}>{displayDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateDisplayContainer: {
    width: '100%',
    paddingVertical: '3%',
    paddingHorizontal: '5%', // Añade márgenes horizontales
    alignItems: 'flex-start', // Alinea el contenido a la izquierda
    backgroundColor: '#EDF3FF',
  },
  dateText: {
    fontSize: 20,
    color: '#000',
  },
});

export default DateComponent;
