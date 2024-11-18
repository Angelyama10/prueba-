import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAgendaById } from '../services/agenda.service';

const { width, height } = Dimensions.get('window');

const AgendaDetailScreen = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAgendaDetails();
    } else {
      console.error('No se recibió un ID válido');
    }
  }, [id]);

  const fetchAgendaDetails = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error('No se encontró el token de autenticación');
        throw new Error('No se encontró el token de autenticación');
      }

      const data = await getAgendaById(token, id);
      setAgenda(data);
    } catch (error) {
      console.error('Error al obtener los detalles de la agenda:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5A9BD3" />
      </View>
    );
  }

  if (!agenda) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se pudo cargar la información de la agenda.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalle de Agenda</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{agenda.nombre}</Text>

        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{agenda.descripcion}</Text>

        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.value}>
          {new Date(agenda.hora).toLocaleString('es-ES', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </Text>

        <Text style={styles.label}>Tipo:</Text>
        <Text style={[styles.value, { color: agenda.tipo === 'Emergencia' ? 'red' : 'black' }]}>
          {agenda.tipo}
        </Text>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    paddingVertical: height * 0.05,
    backgroundColor: '#5A9BD3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: width * 0.06,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#5A9BD3',
  },
});

export default AgendaDetailScreen;
