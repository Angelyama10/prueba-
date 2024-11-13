import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const AddDoctorScreen = ({ navigation }) => {
    const [doctorName, setDoctorName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emergencyNumber, setEmergencyNumber] = useState('');
    const [address, setAddress] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Añadir Médico</Text>
                    <TouchableOpacity onPress={() => {/* Funcionalidad para guardar */ }}>
                        <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del médico"
                        value={doctorName}
                        onChangeText={text => setDoctorName(text)}
                    />
                    <Icon name="doctor" size={24} color="#333" style={styles.icon} />
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Especialidad"
                        value={specialty}
                        onChangeText={text => setSpecialty(text)}
                    />
                    <Icon name="medical-bag" size={24} color="#333" style={styles.icon} />
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                    />
                    <Icon name="email" size={24} color="#333" style={styles.icon} />
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de la telefonía"
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                        keyboardType="phone-pad"
                    />
                    <Icon name="phone" size={24} color="#333" style={styles.icon} />
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de móvil"
                        value={mobileNumber}
                        onChangeText={text => setMobileNumber(text)}
                        keyboardType="phone-pad"
                    />
                    <Icon name="cellphone" size={24} color="#333" style={styles.icon} />
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de emergencia"
                        value={emergencyNumber}
                        onChangeText={text => setEmergencyNumber(text)}
                        keyboardType="phone-pad"
                    />
                    <Icon name="phone-in-talk" size={24} color="#333" style={styles.icon} />
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="Dirección"
                        value={address}
                        onChangeText={text => setAddress(text)}
                    />
                    <Icon name="map-marker" size={24} color="#333" style={styles.icon} />
                </View>
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
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
    },
    input: {
        flex: 1,
    },
    icon: {
        marginLeft: 10,
    },
});

export default AddDoctorScreen;
