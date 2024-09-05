import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DateComponent = ({ selectedDate, setSelectedDate }) => {
  const today = new Date();
  const daysOfWeek = ["Dom", "Lun", "Mart", "Mié", "Jue", "Vie", "Sáb"];

  const generateCalendarDates = () => {
    const dates = [];
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

    // Rellenar días del mes anterior
    const firstWeekDay = firstDayOfMonth.getDay();
    if (firstWeekDay > 0) {
      for (let i = firstWeekDay - 1; i >= 0; i--) {
        dates.push({
          date: new Date(today.getFullYear(), today.getMonth() - 1, lastDayOfPreviousMonth - i),
          currentMonth: false,
        });
      }
    }

    // Rellenar días del mes actual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      dates.push({
        date: new Date(today.getFullYear(), today.getMonth(), day),
        currentMonth: true,
      });
    }

    // Rellenar días del próximo mes hasta completar la semana
    const remainingDays = 42 - dates.length; // 42 es 6 filas de 7 días
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({
        date: new Date(today.getFullYear(), today.getMonth() + 1, i),
        currentMonth: false,
      });
    }

    return dates;
  };

  const datesInCalendar = generateCalendarDates();

  const getDisplayDate = (date) => {
    const dayDiff = (date.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24);

    if (dayDiff === 0) {
      return `Hoy, ${date.getDate()} ${date.toLocaleDateString('es-ES', { month: 'short' })}`;
    } else if (dayDiff === -1) {
      return `Ayer, ${date.getDate()} ${date.toLocaleDateString('es-ES', { month: 'short' })}`;
    } else if (dayDiff === 1) {
      return `Mañana, ${date.getDate()} ${date.toLocaleDateString('es-ES', { month: 'short' })}`;
    } else {
      return `${daysOfWeek[date.getDay()]}, ${date.getDate()} ${date.toLocaleDateString('es-ES', { month: 'short' })}`;
    }
  };

  return (
    <>
      <View style={styles.weekdaysContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.weekday}>
            <Text style={styles.day}>{day}</Text>
          </View>
        ))}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.datesContainer}
      >
        {datesInCalendar.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => setSelectedDate(item.date)} 
            style={[styles.dateContainer, 
              !item.currentMonth && styles.nonCurrentMonthDateContainer
            ]}
          >
            <View style={[
              styles.dateCircle, 
              selectedDate.getDate() === item.date.getDate() && item.currentMonth && styles.selectedDateCircle
            ]}>
              <Text style={[
                styles.date, 
                selectedDate.getDate() === item.date.getDate() && item.currentMonth && styles.selectedDateText
              ]}>
                {item.date.getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.dateDisplayContainer}>
        <Text style={styles.dateText}>{getDisplayDate(selectedDate)}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    paddingVertical: '5%',
    width: '100%',
  },
  weekday: {
    alignItems: 'center',
    flex: 1,
  },
  day: {
    fontSize: 18,
    color: '#000',
    textTransform: 'capitalize',
  },
  datesContainer: {
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dateContainer: {
    alignItems: 'center',
    width: 48,
    marginHorizontal: 8,
    marginVertical: 3,
  },
  nonCurrentMonthDateContainer: {
    opacity: 0.5, // Para desvanecer las fechas que no son del mes actual
  },
  date: {
    fontSize: 18,
    color: '#000',
  },
  dateCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateCircle: {
    backgroundColor: '#5A9BD3',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  dateDisplayContainer: {
    width: '100%',
    paddingVertical: '3%',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  dateText: {
    fontSize: 20,
    color: '#000',
  },
});

export default DateComponent;
