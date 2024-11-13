import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import DateComponent from '../components/DateComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBarComponent from '../components/NavigationBarComponents';
import ModalMedicamento from '../components/ModalMedicamento'; // Asegúrate de que la ruta sea correcta
import { getMedicamentos } from '../services/medicamentos.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const HomeDatos = ({ navigation }) => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  // Estado para el modal
  const [modalVisible, setModalVisible] = useState(false);
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

  const navItems = [
    { text: 'Inicio', iconName: 'home-heart', onPress: () => navigation.navigate('Home') },
    { text: 'Progreso', iconName: 'chart-bar', onPress: () => navigation.navigate('Progress') },
    { text: 'Medicamentos', iconName: 'pill', onPress: () => navigation.navigate('Medicines') },
    { text: 'Más', iconName: 'dots-horizontal', onPress: () => console.log('Más presionado') },
  ];

  // Función para determinar la acción en base a la unidad
  const determinarAccion = (unidad) => {
    const acciones = {
      tabletas: "Tomar",
      pastillas: "Tomar",
      ampollas: "Aplicar",
      aerosol: "Aplicar",
      pomada: "Aplicar",
      crema: "Aplicar",
    };
    return acciones[unidad.toLowerCase()] || "Usar";
  };

  // Función para determinar el icono en base a la unidad
  const obtenerIcono = (unidad) => {
    const iconos = {
      tabletas: "pill",
      pastillas: "pill",
      ampollas: "needle",
      aerosol: "spray",
      pomada: "tube",
      crema: "tube",
      jarabe: "bottle-tonic",
      gotas: "water",
    };
    return iconos[unidad.toLowerCase()] || "pill";
  };

  // Convierte una hora en formato de 12 horas (e.g., "8:00 a.m.") a un objeto Date
  const convertirHoraAFecha = (horaStr) => {
    const [time, modifier] = horaStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'p.m.' && hours < 12) hours += 12;
    if (modifier === 'a.m.' && hours === 12) hours = 0;

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  };

  // Función para obtener los medicamentos desde la API y filtrar las dosis del día
  const fetchMedicamentos = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error("Token no disponible");

      const data = await getMedicamentos(token);
      
      // Filtrar las dosis que son para hoy
      const medicamentosTransformados = data.flatMap((med) =>
        med.dosis
          .filter((dosis) => {
            const dosisHora = convertirHoraAFecha(dosis.hora_dosis);
            const ahora = new Date();
            return (
              dosisHora >= new Date(ahora.setHours(0, 0, 0, 0)) &&
              dosisHora <= new Date(ahora.setHours(23, 59, 59, 999))
            );
          })
          .map((dosis) => ({
            hora: dosis.hora_dosis,
            nombre: med.nombre,
            dosis: `${determinarAccion(med.unidad)} ${dosis.cantidadP} ${med.unidad}${
              dosis.momento_comida ? ` ${dosis.momento_comida}` : ""
            }`,
            icon: obtenerIcono(med.unidad),
            unidad: med.unidad,
            cantidad: dosis.cantidadP,
            momentoComida: dosis.momento_comida,
          }))
      );

      setMedicamentos(medicamentosTransformados);
    } catch (error) {
      console.error("Error al cargar medicamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicamentos();

    const intervalId = setInterval(() => {
      const today = new Date();
      if (today.getDate() !== currentDay) {
        setCurrentDay(today.getDate());
        fetchMedicamentos();
      }
    }, 3600000);

    return () => clearInterval(intervalId);
  }, [currentDay]);

  // Función para abrir el modal con los datos del medicamento seleccionado
  const abrirModal = (medicamento) => {
    setMedicamentoSeleccionado(medicamento);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DateComponent />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#5A9BD3" />
        ) : (
          medicamentos.map((medicamento, index) => (
            <TouchableOpacity key={index} style={styles.medicamentoContainer} onPress={() => abrirModal(medicamento)}>
              <Text style={styles.hora}>{medicamento.hora}</Text>
              <View style={styles.medicamentoCard}>
                <Icon name={medicamento.icon} size={30} color="#555555" style={styles.icon} />
                <View>
                  <Text style={styles.nombre}>{medicamento.nombre}</Text>
                  <Text style={styles.dosis}>{medicamento.dosis}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <NavigationBarComponent navItems={navItems} navigation={navigation} />

      {/* Modal del Medicamento */}
      {medicamentoSeleccionado && (
        <ModalMedicamento
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          nombre={medicamentoSeleccionado.nombre}
          hora={medicamentoSeleccionado.hora}
          unidad={medicamentoSeleccionado.unidad}
          cantidad={medicamentoSeleccionado.cantidad}
          momentoComida={medicamentoSeleccionado.momentoComida}
          icono={medicamentoSeleccionado.icon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingVertical: height * 0.02,
    backgroundColor: '#5A9BD3',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  medicamentoContainer: {
    marginBottom: 20,
  },
  hora: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 8,
  },
  medicamentoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    padding: 15,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  dosis: {
    fontSize: 14,
    color: '#777777',
  },
});

export default HomeDatos;
