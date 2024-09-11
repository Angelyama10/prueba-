import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import NuevoUsuario from './src/screens/NuevoUsuario';
import HomeScreen from './src/screens/home';
import SearchScreen from './src/screens/SearchScreen';
import PresentationScreen from './src/screens/PresentationScreen';
import MedicationScreen from './src/screens/MedicationScreen';
import UnaVezAlDiaScreen from './src/screens/UnaVezAlDiaScreen';
import AdditionalForm from './src/screens/AdditionalForm';
import TreatmentDuration from './src/screens/TreatmentDuration';
import DurationOfTreatment2 from './src/screens/DurationOfTreatment2';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Nuevo" component={NuevoUsuario} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PresentationScreen" component={PresentationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MedicationScreen" component={MedicationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UnaVezAlDiaScreen" component={UnaVezAlDiaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdditionalForm" component={AdditionalForm} options={{ headerShown: false }} />
        <Stack.Screen name="TreatmentDuration" component={TreatmentDuration} options={{ headerShown: false }} />
        <Stack.Screen name="DurationOfTreatment2" component={DurationOfTreatment2} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
