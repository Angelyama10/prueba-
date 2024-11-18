import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import DateComponent from '../components/DateComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBarComponent from '../components/NavigationBarComponents';
import ModalMedicamento from '../components/ModalMedicamento';
import { getMedicamentos } from '../services/medicamentos.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);
  const [userName, setUserName] = useState("Usuario"); // Inicializar con un valor por defecto
  const isFocused = useIsFocused(); // Esto permitirá actualizar al entrar en la pantalla

  const navItems = [
    { text: 'Inicio', iconName: 'home-heart', onPress: () => navigation.navigate('Home') },
    { text: 'Progreso', iconName: 'chart-bar', onPress: () => navigation.navigate('Progress') },
    { text: 'Más', iconName: 'dots-horizontal', onPress: () => console.log('Más presionado') },
  ];

  const determinarAccion = (unidad) => {
    const acciones = {
      tabletas: "Tomar",
      pastillas: "Tomar",
      ampollas: "Aplicar",
      aerosol: "Aplicar",
      pomada: "Aplicar",
      crema: "Aplicar",
      jarabe: "Tomar",
      gotas: "Aplicar",
    };
    return acciones[unidad.toLowerCase()] || "Usar";
  };

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

  const convertirHoraAFecha = (horaStr) => {
    const [time, modifier] = horaStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'p.m.' && hours < 12) hours += 12;
    if (modifier === 'a.m.' && hours === 12) hours = 0;

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  };

  const fetchMedicamentos = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error("Error al cargar medicamentos: Token no disponible");
        // Redirigir a la pantalla de inicio de sesión si es necesario
        navigation.navigate('Login');
        return;
      }
  
      const data = await getMedicamentos(token);
  
      const medicamentosFiltrados = data
        .map((med) => {
          const dosisDelDia = med.dosis.filter((dosis) => {
            const dosisHora = convertirHoraAFecha(dosis.hora_dosis);
            const ahora = new Date();
            return (
              dosisHora >= new Date(ahora.setHours(0, 0, 0, 0)) &&
              dosisHora <= new Date(ahora.setHours(23, 59, 59, 999))
            );
          });
  
          if (dosisDelDia.length > 0) {
            return {
              ...med,
              dosis: dosisDelDia,
            };
          }
          return null;
        })
        .filter((med) => med !== null);
  
      setMedicamentos(medicamentosFiltrados);
    } catch (error) {
      console.error("Error al cargar medicamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserName = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      if (name) {
        setUserName(name);
      }
    } catch (error) {
      console.error("Error al obtener el nombre del usuario:", error);
    }
  };

  useEffect(() => {
    fetchUserName(); // Obtener el nombre del usuario cuando se monta el componente
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchMedicamentos();
    }
  }, [isFocused]);

  const abrirModal = (medicamento, dosis) => {
    setMedicamentoSeleccionado({ ...medicamento, dosisSeleccionada: dosis });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={width * 0.1} color="#FFFFFF" />
        <Text style={styles.headerText}>{`${userName} - Inicio`}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <DateComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        {loading ? (
          <ActivityIndicator size="large" color="#5A9BD3" />
        ) : medicamentos.length > 0 ? (
          medicamentos.map((medicamento) => (
            <View key={medicamento.id} style={styles.medicamentoContainer}>
              {medicamento.dosis.map((dosis) => (
                <TouchableOpacity
                  key={dosis.id}
                  style={styles.medicamentoCard}
                  onPress={() => abrirModal(medicamento, dosis)}
                >
                  <Text style={styles.hora}>{dosis.hora_dosis}</Text>
                  <View style={styles.medicamentoInfo}>
                    <Icon name={obtenerIcono(medicamento.unidad)} size={40} color="#5A9BD3" style={styles.icon} />
                    <View>
                      <Text style={styles.nombre}>{medicamento.nombre}</Text>
                      <Text style={styles.dosis}>
                        {`${determinarAccion(medicamento.unidad)} ${dosis.cantidadP} ${medicamento.unidad}(s)`}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.infoSectionContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/images/calendario.jpg')} style={styles.image} />
            </View>
            <Text style={styles.infoTitle}>¡Cuidamos de Ti en Misalud!</Text>
            <Text style={styles.infoDescription}>
              Tu salud es nuestra prioridad. Comienza a registrar tu información para un mejor control y seguimiento.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Search')}
            >
              <Text style={styles.buttonText}>Agregar Medicamento</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <NavigationBarComponent navItems={navItems} navigation={navigation} />

      {medicamentoSeleccionado && (
        <ModalMedicamento
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          id={medicamentoSeleccionado.id}
          nombre={medicamentoSeleccionado.nombre}
          hora={medicamentoSeleccionado.dosisSeleccionada.hora_dosis}
          unidad={medicamentoSeleccionado.unidad}
          cantidad={medicamentoSeleccionado.dosisSeleccionada.cantidadP}
          momentoComida={medicamentoSeleccionado.dosisSeleccionada.momento_comida}
          icono={obtenerIcono(medicamentoSeleccionado.unidad)}
        />
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
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
  },
  content: {
    paddingBottom: 100,
  },
  infoSectionContainer: {
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  image: {
    width: '70%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  infoDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#666666',
    marginBottom: '5%',
  },
  button: {
    backgroundColor: '#5A9BD3',
    paddingVertical: '4%',
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicamentoContainer: {
    padding: 10,
  },
  medicamentoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  medicamentoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  hora: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dosis: {
    fontSize: 16,
    color: '#666666',
  },
});

export default HomeScreen;
