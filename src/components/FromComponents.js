import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FromComponents = ({ navigation, onRegister, placeholders }) => {
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    const userData = { username, lastName, birthdate, gender, password, confirmPassword };
    onRegister(userData);
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholders.username}
          value={username}
          onChangeText={setUsername}
          underlineColorAndroid="transparent"
          placeholderTextColor="#000"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholders.lastName}
          value={lastName}
          onChangeText={setLastName}
          underlineColorAndroid="transparent"
          placeholderTextColor="#000"
        />
      </View>
      
      <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder={placeholders.birthdate}
    value={birthdate}
    onChangeText={(text) => {
      const formattedDate = text
        .replace(/\D/g, '')
        .replace(/(\d{4})(\d{2})?(\d{2})?/, (match, year, month, day) => {
          if (day) return `${year}-${month}-${day}`;
          if (month) return `${year}-${month}`;
          return year;
        });

      setBirthdate(formattedDate);
    }}
    keyboardType="numeric"
    underlineColorAndroid="transparent"
    placeholderTextColor="#000"
    maxLength={10}
  />
</View>

      
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona tu género" value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholders.password}
          secureTextEntry // Oculta el texto de la contraseña
          value={password}
          onChangeText={setPassword}
          underlineColorAndroid="transparent"
          placeholderTextColor="#000"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholders.confirmPassword}
          secureTextEntry // Oculta el texto de confirmación de contraseña
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          underlineColorAndroid="transparent"
          placeholderTextColor="#000"
        />
      </View>

      {/* Términos y condiciones */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>Acepto las condiciones de uso y privacidad</Text>
      </View>

      {/* Botón de Registro */}
      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
        <Text style={styles.registerButtonText}>Registrarte</Text>
      </TouchableOpacity>

      {/* Texto y botón de Login */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>¿Ya eres usuario?</Text>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  picker: {
    height: 40,
    width: '100%',
    color: '#000',
    backgroundColor: '#DBEBFF',
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

export default FromComponents;
