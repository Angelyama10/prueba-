import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
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

        <View style={styles.linksContainer}>
          <View style={styles.leftLinks}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>¿Has olvidado tu contraseña?</Text>
              <Text style={styles.resetPasswordText}>Recuperar contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.leftLinks}>
          <TouchableOpacity>
            <Text style={styles.UsuarioText}>¿No tienes usuario?</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.rightButton}>
          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => navigation.navigate('NuevoUsuario')} // Navega a la nueva pantalla
          >
            <Text style={styles.registerButtonText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco para el contenedor principal
    alignItems: 'center',
  },
  topContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 35,
    fontFamily: 'YanoneKaffeesatz-Regular',
    marginTop: 20,
    marginBottom: 10,
    color: '#000000',
  },
  loginImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    color: '#000000',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#B5D6FD', // Color de fondo azul para el formulario
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    borderColor: '#ADD8E6',
    borderWidth: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'DMSans_18pt-Regular',
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    height: 50, // Aumentar la altura del campo de entrada de texto
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 18, // Aumentar el tamaño de la fuente
  },
  loginButton: {
    alignSelf: 'flex-end',
    width: '50%',
    height: 50, // Aumentar la altura del botón
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },  
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'DMSans_18pt-Regular',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  leftLinks: {
    flex: 1,
  },
  rightButton: {
    flex: 2,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 16,
    fontFamily: 'DMSans_18pt-Regular',
    color: '#000000',
  },
  UsuarioText:{
    fontSize: 16,
    fontFamily: 'DMSans_18pt-Regular',
    marginBottom: 5,
    color: '#000000',
  },
  resetPasswordText: {
    fontSize: 16,
    fontFamily: 'DMSans_18pt-Regular',
    color: '#1E90FF',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#5A9BD3', // Color del botón de registro
    paddingVertical: 15, // Aumentar el padding vertical
    paddingHorizontal: 90, // Aumentar el padding horizontal
    borderRadius: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'DMSans_18pt-Regular',
  },
  noAccountText: {
    fontSize: 14,
    fontFamily: 'DMSans_18pt-Regular',
    color: '#000000',
    textAlign: 'center',
  }
});

export default LoginScreen;
