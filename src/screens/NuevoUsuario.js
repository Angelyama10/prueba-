import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import FromComponents from '../components/FromComponents';

const NuevoUsuario = ({ navigation }) => {
  
  const handleRegister = () => {
    // Aquí puedes manejar el envío del formulario, por ejemplo, llamar a una API
    if (password === confirmPassword) {
      alert(`Usuario registrado:\nNombre: ${username}\nApellidos: ${lastName}`);
    } else {
      alert('Las contraseñas no coinciden');
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
