import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import HomeIcon from '../../assets/images/home.svg';
import ProgresoIcon from '../../assets/images/progreso.svg';
import MasIcon from '../../assets/images/mas.svg';
import UsuarioIcon from '../../assets/images/usuario.svg';

const HomeScreen = () => {
  const today = new Date();
  const daysOfWeek = ["Lun", "Mart", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const [selectedDate, setSelectedDate] = useState(today);
  const [isInitialScroll, setIsInitialScroll] = useState(true); // Estado para controlar el desplazamiento inicial
  const scrollViewRef = useRef(null);

  // Generar todas las fechas del mes actual
  const generateDates = () => {
    const dates = [];
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(today.getFullYear(), today.getMonth(), day));
    }
    return dates;
  };

  const datesInMonth = generateDates();

  useEffect(() => {
    if (isInitialScroll) {
      const todayIndex = datesInMonth.findIndex(
        date => date.getDate() === today.getDate() && date.getMonth() === today.getMonth()
      );

      const screenWidth = Dimensions.get('window').width;
      const itemWidth = 65; // Ancho ajustado de cada ítem de fecha
      const daysVisible = Math.floor(screenWidth / itemWidth); // Número de días visibles en la pantalla
      const halfDaysVisible = Math.floor(daysVisible / 2); // La mitad de los días visibles

      if (scrollViewRef.current) {
        requestAnimationFrame(() => {
          const scrollToX = (todayIndex - halfDaysVisible) * itemWidth;
          const finalScrollX = Math.max(0, Math.min(scrollToX, (datesInMonth.length - daysVisible) * itemWidth));
          scrollViewRef.current.scrollTo({ x: finalScrollX, animated: true });
          setIsInitialScroll(false); // Desactivar el desplazamiento automático después de la primera vez
        });
      }
    }
  }, [datesInMonth, isInitialScroll]);

  // Formatear la fecha seleccionada
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
    <View style={styles.container}>
      <View style={styles.header}>
        <UsuarioIcon width={40} height={40} />
        <Text style={styles.headerText}>Alonso</Text>
      </View>
      
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
        style={styles.datesContainer}
        ref={scrollViewRef}
      >
        {datesInMonth.map((date, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => setSelectedDate(date)} 
            style={styles.dateContainer}
          >
            <View style={[
              styles.dateCircle, 
              selectedDate.getDate() === date.getDate() && styles.selectedDateCircle
            ]}>
              <Text style={[
                styles.date, 
                selectedDate.getDate() === date.getDate() && styles.selectedDateText
              ]}>
                {date.getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.dateDisplayContainer}>
        <Text style={styles.dateText}>{getDisplayDate(selectedDate)}</Text>
      </View>
      
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/calendario.jpg')} style={styles.loginImage} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>¡Cuidamos de Ti en Misalud!</Text>
        <Text style={styles.infoText}>
          Tu salud es nuestra prioridad. Comienza a registrar tu información para un mejor control y seguimiento.
        </Text>
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Agregar Medicamento</Text>
      </TouchableOpacity>

      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton}>
          <HomeIcon width={30} height={30} />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <ProgresoIcon width={30} height={30} />
          <Text style={styles.navText}>Progreso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Medicamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <MasIcon width={30} height={30} />
          <Text style={styles.navText}>Más</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    paddingVertical: '5%',
    backgroundColor: '#5A9BD3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
  headerText: {
    fontSize: 20,
    marginLeft: '5%',
    color: '#FFFFFF',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '105%',
    backgroundColor: '#E0E0E0',
    paddingVertical: '2%',
  },
  weekday: {
    alignItems: 'center',
    width: 45,
  },
  day: {
    fontSize: 16,
    color: '#000',
    textTransform: 'capitalize',
  },
  datesContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: '1.5%',
  },
  dateContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  date: {
    fontSize: 18,
    color: '#000',
  },
  dateCircle: {
    width: 44,
    height: 44,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  imageContainer: {
    marginVertical: '-2%',
    alignItems: 'center',
  },
  loginImage: {
    width: '65%',
    height: undefined,
    aspectRatio: 1, 
    resizeMode: 'contain',
  },
  infoContainer: {
    alignItems: 'center',
    marginHorizontal: '5%',
    marginBottom: '5%',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: '10%',
  },
  button: {
    backgroundColor: '#5A9BD3',
    paddingVertical: '4%',
    paddingHorizontal: '15%',
    borderRadius: 20,
    marginBottom: '15%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: '3%',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default HomeScreen;
