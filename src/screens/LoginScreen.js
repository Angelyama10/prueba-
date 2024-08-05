import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Bienvenidos</Text>
        <Image source={require('../../assets/images/Login.jpg')} style={styles.loginImage} />
        <Text style={styles.loginText}>Iniciar sesión</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>NOMBRE</Text>
          <TextInput style={styles.input} placeholder="Nombre" />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>PASSWORD</Text>
          <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>¿Has olvidado tu contraseña?</Text>
          <Text style={styles.resetPasswordText}>Recuperar contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.noAccountText}>¿No tienes usuario?</Text>
          <Text style={styles.registerText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#B5D6FD', // Color de fondo azul claro
    borderRadius: 5, // Borde redondeado de 5 px
  },
  topContainer: {
    alignItems: 'center',
    backgroundColor: '#ffff',
    width: '100%',
    paddingVertical: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 45,
    fontFamily: 'YanoneKaffeesatz-SemiBold', // Usa el nombre de la fuente aquí
    marginTop: 20,
    marginBottom: 10,
  },
  loginImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  loginText: {
    fontSize: 25,
    fontFamily: 'YanoneKaffeesatz-SemiBold', // Usa el nombre de la fuente aquí
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    width: '80%',
    backgroundColor: '#B5D6FD', // Color de fondo azul claro
    borderRadius: 20,
    padding: 20,
    borderColor: '#ADD8E6',
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 40,
    fontFamily: 'YanoneKaffeesatz-SemiBold', // Asegúrate de que este nombre sea correcto
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
    alignSelf: 'flex-end',
    width: '30%',
    height: 40,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'DMSans-Regular', // Asegúrate de que este nombre sea correcto
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular', // Asegúrate de que este nombre sea correcto
    color: '#000',
  },
  resetPasswordText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular', // Asegúrate de que este nombre sea correcto
    color: '#1E90FF',
    marginBottom: 20,
  },
  noAccountText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular', // Asegúrate de que este nombre sea correcto
    color: '#000',
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular', // Asegúrate de que este nombre sea correcto
    color: '#1E90FF',
    marginBottom: 40,
  },
});

export default LoginScreen;
