import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>¿Has olvidado tu contraseña?</Text>
            <Text style={styles.resetPasswordText}>Recuperar contraseña</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity>
          <Text style={styles.UsuarioText}>¿No tienes usuario?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={() => navigation.navigate('Nuevo')} 
        >
          <Text style={styles.registerButtonText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: '5%', 
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: width * 0.07, // Escalando tamaño de fuente con el ancho de la pantalla
    fontFamily: 'YanoneKaffeesatz-Regular',
    marginTop: '5%', 
    marginBottom: '2%',
    color: '#000000',
    textAlign: 'center', 
  },
  loginImage: {
    width: '50%', 
    height: undefined, 
    aspectRatio: 1, 
    resizeMode: 'contain',
    marginBottom: '5%',
  },
  loginText: {
    fontSize: width * 0.06, // Escalando tamaño de fuente con el ancho de la pantalla
    fontFamily: 'Poppins-Regular',
    marginBottom: '5%',
    color: '#000000',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#B5D6FD', 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: '10%', 
    paddingVertical: '5%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: '5%',
  },
  labelText: {
    fontSize: width * 0.045, // Escalando tamaño de fuente con el ancho de la pantalla
    fontFamily: 'DMSans_18pt-Regular',
    marginBottom: '2%',
    color: '#000000',
  },
  input: {
    height: 50, 
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontSize: width * 0.045, // Escalando tamaño de fuente con el ancho de la pantalla
    width: '100%',
  },
  loginButton: {
    width: '55%', 
    height: 50, 
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%', 
    marginBottom: '5%', 
    borderRadius: 10,
  },  
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045, // Escalando tamaño de fuente con el ancho de la pantalla
    fontFamily: 'DMSans_18pt-Regular',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '2%', 
  },
  forgotPasswordText: {
    fontSize: width * 0.045, // Escalando tamaño de fuente con el ancho de la pantalla
    fontFamily: 'DMSans_18pt-Regular',
    color: '#000000',
  },
  UsuarioText: {
    fontSize: width * 0.045, // Escalando tamaño de fuente con el ancho de la pantalla
    fontFamily: 'DMSans_18pt-Regular',
    marginBottom: 5,
    color: '#000000',
    textAlign: 'center',  
  },
  resetPasswordText: {
    fontSize: width * 0.045, // Escalando tamaño de fuente con el ancho de la pantalla
    fontFamily: 'DMSans_18pt-Regular',
    color: '#1E90FF',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#5A9BD3',
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 10,
    width: '100%', 
    alignItems: 'center',
    marginTop: '5%',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045, // Escalando tamaño de fuente con el ancho de la pantalla
    fontFamily: 'DMSans_18pt-Regular',
  },
});

export default LoginScreen;
