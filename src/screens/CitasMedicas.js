import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAppointments } from '../services/appointment.service'; // Importar el servicio

const { width, height } = Dimensions.get('window');

const CitasMedicas = ({ navigation }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                console.error('No se encontró el token de autenticación');
                throw new Error('No se encontró el token de autenticación');
            }

            const data = await getAppointments(token);
            setAppointments(data);
        } catch (error) {
            console.error('Error al cargar las citas:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Citas</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AppointmentScreen')}>
                    <Icon name="plus" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color="#5A9BD3" />
                ) : appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <TouchableOpacity
                            key={appointment.id}
                            style={styles.appointmentItem}
                            onPress={() =>
                                navigation.navigate('AppointmentDetailScreen', {
                                    id: appointment.id,
                                })
                            }
                        >
                            <View style={styles.appointmentContent}>
                                <Text style={styles.appointmentTitle}>
                                    {appointment.nombre_cita || 'Sin título'}
                                </Text>
                                <Text style={styles.appointmentDate}>
                                    {appointment.hora
                                        ? new Date(appointment.hora).toLocaleString('es-ES', {
                                              dateStyle: 'medium',
                                              timeStyle: 'short',
                                          })
                                        : 'Fecha no disponible'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Icon name="book-outline" size={100} color="#5A9BD3" />
                        <Text style={styles.title}>Organice sus citas médicas</Text>
                        <Text style={styles.description}>
                            Escriba sus visitas médicas y reciba un recordatorio por adelantado.
                        </Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate('AppointmentScreen')}
                        >
                            <Text style={styles.addButtonText}>Añadir una visita</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
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
        paddingVertical: height * 0.04,
        backgroundColor: '#5A9BD3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: width * 0.05,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    appointmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    appointmentContent: {
        flex: 1,
    },
    appointmentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    appointmentDate: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#5A9BD3',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 20,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CitasMedicas;
