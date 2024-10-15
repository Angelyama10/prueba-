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
import RefillingMedications from './src/screens/RefillingMedications';
import MedicationInstructions from './src/screens/MedicationInstructions';
import TwiceaDay from './src/screens/TwiceaDay';
import ThreeTimesADay from './src/screens/ThreeTimesADay';
import MedicationProgram from './src/screens/MedicationProgram';
import MoreOptionsModal from './src/screens/MoreOptionsModal';
import AgendaScreen from './src/screens/AgendaScreen';
import Medicines from './src/screens/Medicines';
import Progress from './src/screens/Progress';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
          headerShown: false
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Nuevo" component={NuevoUsuario} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="PresentationScreen" component={PresentationScreen} />
        <Stack.Screen name="MedicationScreen" component={MedicationScreen} />
        <Stack.Screen name="UnaVezAlDiaScreen" component={UnaVezAlDiaScreen} />
        <Stack.Screen name="AdditionalForm" component={AdditionalForm} />
        <Stack.Screen name="TreatmentDuration" component={TreatmentDuration} />
        <Stack.Screen name="DurationOfTreatment2" component={DurationOfTreatment2} />
        <Stack.Screen name="RefillingMedications" component={RefillingMedications} />
        <Stack.Screen name="MedicationInstructions" component={MedicationInstructions} />
        <Stack.Screen name="TwiceaDay" component={TwiceaDay} />
        <Stack.Screen name="ThreeTimesADay" component={ThreeTimesADay} />
        <Stack.Screen name="MedicationProgram" component={MedicationProgram} />
        <Stack.Screen name="MoreOptionsModal" component={MoreOptionsModal} />
        <Stack.Screen name="AgendaScreen" component={AgendaScreen} />
        <Stack.Screen name="Medicines" component={Medicines} />
        <Stack.Screen name="Progress" component={Progress} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
