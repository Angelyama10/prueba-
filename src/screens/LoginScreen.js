import React, { useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { auth } from '../services/auth.service';
import ErrorModal from '../components/ErrorModal';
import { LogBox } from 'react-native';

const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !contraseña) {
        setErrorMessage('Por favor, ingresa el correo y la contraseña');
        setErrorVisible(true);
        return;
      }

      const dataUser = { email, contraseña };
      console.log("Datos de autenticación enviados:", dataUser);

      const response = await auth(dataUser);

      if (response?.access_token) {
        console.log("Token recibido:", response.access_token);

        // Guardar el token en AsyncStorage
        await AsyncStorage.setItem('userToken', response.access_token);

        navigation.navigate('Home');
      } else {
        setErrorMessage('Usuario o contraseña incorrectos. Intenta de nuevo o restablece tu contraseña.');
        setErrorVisible(true);
      }
    } catch (error) {
      const errorMsg = error.message.includes('Error en autenticación') ?
        'Usuario o contraseña incorrectos. Intenta de nuevo o restablece tu contraseña.' :
        'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.';
      setErrorMessage(errorMsg);
      setErrorVisible(true);
      console.error("Error en login:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#B5D6FD', '#FFFFFF']}
        style={styles.background}
      >
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
                placeholder="Correo electrónico"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#888"
                secureTextEntry
                value={contraseña}
                onChangeText={setContraseña}
              />
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
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

        <View style={styles.bottomDecoration} />

        <ErrorModal
          visible={errorVisible}
          message={errorMessage}
          onClose={() => setErrorVisible(false)}
        />
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
