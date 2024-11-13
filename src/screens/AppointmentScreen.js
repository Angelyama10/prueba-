import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateComponent from '../components/DateComponent'; // Asegúrate de ajustar la ruta según la ubicación de tu componente

const { width, height } = Dimensions.get('window');

const AppointmentScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [doctor, setDoctor] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icon name="arrow-left" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Agrega Agendamiento</Text>
                    <TouchableOpacity onPress={() => {/* Funcionalidad para guardar */ }}>
                        <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Escriba título de la cita"
                    value={title}
                    onChangeText={text => setTitle(text)}
                />
                <TouchableOpacity style={styles.input}>
                    <Text>{doctor ? doctor : 'Elige médico'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.input}>
                    <Text>{time ? time : 'Configure hora del agendamiento'}</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Ubicación"
                    value={location}
                    onChangeText={text => setLocation(text)}
                />
                <TextInput
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                    placeholder="Escribir Anotación"
                    value={note}
                    multiline
                    onChangeText={text => setNote(text)}
                />
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
        paddingVertical: height * 0.05,
        backgroundColor: '#5A9BD3',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: width * 0.06,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
    },
});

export default AppointmentScreen;
