import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Importa el componente para el degradado

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Fondo con degradado */}
      <LinearGradient
        colors={['#B5D6FD', '#FFFFFF']}
        style={styles.background}
      >
        {/* Elemento decorativo superior */}
        <View style={styles.topDecoration} />

        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <Image
              source={require('../../assets/images/Login.jpg')}
              style={styles.loginImage}
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.loginText}>Iniciar sesión</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#888"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // Navegar a la pantalla de recuperación de contraseña
              }}
            >
              <Text style={styles.forgotPasswordText}>Recuperar contraseña</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.noAccountText}>¿No tienes una cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Nuevo')}
              >
                <Text style={styles.registerText}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Elemento decorativo inferior */}
        <View style={styles.bottomDecoration} />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  topDecoration: {
    position: 'absolute',
    top: -height * 0.1,
    left: -width * 0.3,
    width: width * 1,
    height: width * 1,
    backgroundColor: '#5A9BD3',
    borderRadius: width * 0.5,
    opacity: 0.2,
  },
  bottomDecoration: {
    position: 'absolute',
    bottom: -height * 0.1,
    right: -width * 0.3,
    width: width * 1,
    height: width * 1,
    backgroundColor: '#5A9BD3',
    borderRadius: width * 0.5,
    opacity: 0.2,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  welcomeText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: height * 0.015,
  },
  loginImage: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
  },
  formContainer: {
    paddingHorizontal: '8%',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  loginText: {
    fontSize: width * 0.06,
    color: '#000000',
    marginBottom: height * 0.02,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: height * 0.015,
  },
  input: {
    width: '100%',
    height: height * 0.06,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#FFFFFF',
    fontSize: width * 0.045,
    color: '#000',
  },
  loginButton: {
    width: '100%',
    height: height * 0.065,
    backgroundColor: '#5A9BD3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.02,
    marginTop: height * 0.015,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    fontSize: width * 0.04,
    color: '#5A9BD3',
    marginTop: height * 0.015,
    textDecorationLine: 'underline',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: height * 0.025,
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: width * 0.042,
    color: '#000',
  },
  registerText: {
    fontSize: width * 0.042,
    color: '#5A9BD3',
    marginLeft: width * 0.01,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
