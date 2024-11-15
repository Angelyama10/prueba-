import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import DateComponent from '../components/DateComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBarComponent from '../components/NavigationBarComponents';
import ModalMedicamento from '../components/ModalMedicamento';
import { getMedicamentos } from '../services/medicamentos.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const HomeDatos = ({ navigation, onDataAvailable }) => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

  const [modalVisible, setModalVisible] = useState(false);
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);

  const fetchMedicamentos = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error("Token no disponible");

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
      // Llama a onDataAvailable si hay medicamentos
      if (medicamentosFiltrados.length > 0) {
        onDataAvailable();
      }
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

  const abrirModal = (medicamento, dosis) => {
    setMedicamentoSeleccionado({ ...medicamento, dosisSeleccionada: dosis });
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
          medicamentos.map((medicamento) => (
            <View key={medicamento.id}>
              {medicamento.dosis.map((dosis) => (
                <TouchableOpacity
                  key={dosis.id}
                  style={styles.medicamentoContainer}
                  onPress={() => abrirModal(medicamento, dosis)}
                >
                  <Text style={styles.hora}>{dosis.hora_dosis}</Text>
                  <View style={styles.medicamentoCard}>
                    <Icon name={obtenerIcono(medicamento.unidad)} size={30} color="#555555" style={styles.icon} />
                    <View>
                      <Text style={styles.nombre}>{medicamento.nombre}</Text>
                      <Text style={styles.dosis}>
                        {`${determinarAccion(medicamento.unidad)} ${dosis.cantidadP} ${medicamento.unidad}${
                          dosis.momento_comida ? ` ${dosis.momento_comida}` : ""
                        }`}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))
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

export default HomeDatos;
