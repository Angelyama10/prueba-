import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/es';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendAppointment } from '../services/appointment.service'; // Importa el servicio

const { width, height } = Dimensions.get('window');

const AppointmentScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [doctor, setDoctor] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleSave = async () => {
        if (!title || !doctor || !time || !location) {
            Alert.alert('Error', 'Por favor, complete todos los campos requeridos.');
            return;
        }
    
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                Alert.alert('Error', 'No se encontró el token de autenticación.');
                return;
            }
    
            // Preparar los datos con los nombres requeridos por la API
            const appointmentData = {
                nombre_cita: title,
                medico: doctor,
                hora: time,
                ubicacion_hospital: location,
                notas: note,
            };
    
            console.log('Datos preparados para enviar:', appointmentData);
    
            // Llamar al servicio para enviar la cita médica
            const response = await sendAppointment(token, appointmentData);
            Alert.alert('Éxito', 'La cita médica ha sido guardada correctamente.');
            console.log('Respuesta de la API:', response);
    
            navigation.goBack(); // Regresar a la pantalla anterior
        } catch (error) {
            console.error('Error al guardar la cita médica:', error.message);
            Alert.alert('Error', 'No se pudo guardar la cita médica. Por favor, inténtelo de nuevo.');
        }
    };
    

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Agrega Agendamiento</Text>
                </View>
            </View>

            {/* Formulario */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Título de la cita</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Consulta médica"
                    value={title}
                    placeholderTextColor="#666"
                    onChangeText={text => setTitle(text)}
                />

                <Text style={styles.label}>Nombre del médico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Dr. Juan Pérez"
                    value={doctor}
                    placeholderTextColor="#666"
                    onChangeText={text => setDoctor(text)}
                />

                <Text style={styles.label}>Fecha y Hora</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setDatePickerVisibility(true)}
                >
                    <Text style={time ? styles.text : styles.placeholder}>
                        {time || 'Seleccione la fecha y hora'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.label}>Ubicación</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Clínica ABC"
                    value={location}
                    placeholderTextColor="#666"
                    onChangeText={text => setLocation(text)}
                />

                <Text style={styles.label}>Nota adicional</Text>
                <TextInput
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                    placeholder="Detalles adicionales (opcional)"
                    value={note}
                    placeholderTextColor="#666"
                    multiline
                    onChangeText={text => setNote(text)}
                />
            </ScrollView>

            {/* Botón Guardar */}
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
            >
                <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>

            {/* DateTime Picker */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={(date) => {
                    setDatePickerVisibility(false);
                    setTime(moment(date).locale('es').format('YYYY-MM-DD HH:mm'));
                }}
                onCancel={() => setDatePickerVisibility(false)}
                locale="es_ES"
                is24Hour
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        width: '100%',
        paddingVertical: height * 0.05,
        backgroundColor: '#5A9BD3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    headerText: {
        fontSize: width * 0.05,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    placeholder: {
        color: '#aaa',
        fontSize: 16,
    },
    text: {
        color: '#333',
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#5A9BD3',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    saveButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AppointmentScreen;
