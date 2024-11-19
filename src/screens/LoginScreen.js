import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../services/auth.service';
import ErrorModal from '../components/ErrorModal';

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decodificando JWT:", error);
    return null;
  }
};

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

      const response = await auth(dataUser);

      if (response?.access_token) {
        await AsyncStorage.setItem('userToken', response.access_token);

        const decodedToken = decodeJWT(response.access_token);
        const userId = decodedToken?.sub;
        const userName = decodedToken?.username;

        if (userId && userName) {
          await AsyncStorage.setItem('userId', userId.toString());
          await AsyncStorage.setItem('userName', userName);
          navigation.navigate('Home');
        } else {
          throw new Error("Datos de usuario incompletos en el token");
        }
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
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#B5D6FD', '#FFFFFF']}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-8">
          {/* Sección Superior */}
          <View className="items-center mb-4">
            <Text className="text-2xl font-bold text-black mb-4">Bienvenido</Text>
            <Image
              source={require('../../assets/images/Login.jpg')}
              className="w-40 h-40"
              resizeMode="contain"
            />
          </View>

          {/* Formulario */}
          <View className="mt-4 items-center">
            <Text className="text-xl font-bold text-black mb-4">Iniciar sesión</Text>

            <TextInput
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white text-base text-black mb-3"
              placeholder="Correo electrónico"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white text-base text-black mb-3"
              placeholder="Contraseña"
              placeholderTextColor="#888"
              secureTextEntry
              value={contraseña}
              onChangeText={setContraseña}
            />

            <TouchableOpacity
              className="w-full h-14 bg-blue-600 justify-center items-center rounded-lg mt-3"
              onPress={handleLogin}
            >
              <Text className="text-white text-base font-bold">Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="text-blue-600 text-sm mt-4 underline">Recuperar contraseña</Text>
            </TouchableOpacity>

            {/* Registro */}
            <View className="flex-row mt-6 items-center">
              <Text className="text-sm text-black">¿No tienes una cuenta?</Text>
              <TouchableOpacity
                className="ml-2 px-4 py-2 bg-blue-600 rounded-lg"
                onPress={() => navigation.navigate('Nuevo')}
              >
                <Text className="text-white text-sm font-bold">Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Modal de Error */}
        <ErrorModal
          visible={errorVisible}
          message={errorMessage}
          onClose={() => setErrorVisible(false)}
        />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
