import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import FromComponents from '../components/FromComponents';
import { registerUser } from '../services/usuarios.service';

const NuevoUsuario = ({ navigation }) => {
  const handleRegister = async (userData) => {
    // Validaciones básicas
    const { username, lastName, birthdate, gender, password, confirmPassword } = userData;

    if (!username || !lastName || !birthdate || !gender || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(birthdate); // Formato: YYYY-MM-DD
    if (!isValidDate) {
      Alert.alert('Error', 'La fecha de nacimiento debe estar en el formato YYYY-MM-DD');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await registerUser(userData);
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
    } catch (error) {
      Alert.alert('Error', `No se pudo registrar el usuario: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Rellena tus datos</Text>
        <Image source={require('../../assets/images/Nuevo_usuario.jpg')} style={styles.image} />
      </View>

      <FromComponents 
        onRegister={handleRegister} 
        navigation={navigation} 
        placeholders={{
          username: "Nombres",
          lastName: "Apellidos",
          birthdate: "Fecha de nacimiento",
          gender: "Sexo",
          password: "Contraseña",
          confirmPassword: "Confirmar contraseña"
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco para el contenedor principal
    paddingVertical: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 45,
    fontFamily: 'YanoneKaffeesatz-Regular',
    marginBottom: 10,
    color: '#000000',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default NuevoUsuario;
