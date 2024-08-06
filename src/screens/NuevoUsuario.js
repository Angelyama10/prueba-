import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const NuevoUsuario = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="NOMBRE"
            value={username}
            onChangeText={setUsername}
            underlineColorAndroid="transparent"
            placeholderTextColor="#000"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={lastName}
            onChangeText={setLastName}
            underlineColorAndroid="transparent"
            placeholderTextColor="#000"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Fecha de nacimiento"
            value={birthdate}
            onChangeText={setBirthdate}
            underlineColorAndroid="transparent"
            placeholderTextColor="#000"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sexo"
            value={gender}
            onChangeText={setGender}
            underlineColorAndroid="transparent"
            placeholderTextColor="#000"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            underlineColorAndroid="transparent"
            placeholderTextColor="#000"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            underlineColorAndroid="transparent"
            placeholderTextColor="#000"
          />
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>Acepto las condiciones de uso y privacidad</Text>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Registrarte</Text>
        </TouchableOpacity>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>¿Ya eres usuario ?</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
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
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#DBEBFF', // Color de fondo azul para el formulario
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    borderColor: '#ADD8E6',
    borderWidth: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40, // Aumenta el margen inferior para más separación
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#DBEBFF',
    fontSize: 18,
    color: '#000',
  },
  termsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#000000',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#5A9BD3',
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 20,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'DMSans-Regular',
  },
  loginButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'DMSans-Regular',
    textAlign: 'center',
  },
});

export default NuevoUsuario;
