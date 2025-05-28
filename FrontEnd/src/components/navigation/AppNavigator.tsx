import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from '../../screens/HomeScreens/HomeScreens';
import InscriptionProfessionnel from '../InscriptionProfessionnel/InscriptionProfessionnel';
import SelectionMotifScreen from '../SelectionMotifScreen/SelectionMotifScreen';
import SelectionDateScreen from '../SelectionDateScreen/SelectionDateScreen';
import InscriptionProfessionnelPart2 from '../InscriptionProfessionnelPart2/InscriptionProfessionnelPart2';
import CreationCompteScreen from '../CreationCompteScreen/CreationCompteScreen'; 
import ConfirmationScreen from '../ConfermationScreen/ConfermationScreen';
import OTPVerification from '../OTPVerification/OTPVerification'; 
import AvocatProfileScreen from '../AvocatProfileScreen/AvocatProfileScreen';
import { Avocat, Client } from '../../types/navigation';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import LoginScreen from '../LoginScreen/LoginScreen';
import DashboardScreen from '../DashboardScreen/DashboardScreen';
import EditUserScreen from '../EditUserScreen/EditUserScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  InscriptionProfessionnel: undefined;
  InscriptionProfessionnelPart2: {
    baseData: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  };
  SelectionMotif: { avocatId: number };
  SelectionDate: { 
    avocatId: number;
    motif: string;
  };
  CreationCompte: {
    avocatId: number;
    motif: string;
    dateHeure: string;
  };
  Confirmation: { 
    date: string;
    hour: string;
    avocat: Avocat;
  };
  OTPVerification: { 
    phoneNumber: string;
    clientData: Client;
  };
  AvocatProfile: { avocat: Avocat };
  Dashboard: undefined;
  EditUser: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerBackTitle: '',
        headerTintColor: '#2E4E3F',
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreens} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="InscriptionProfessionnel" 
        component={InscriptionProfessionnel} 
        options={{ title: 'Inscription Professionnel' }} 
      />
      <Stack.Screen 
        name="InscriptionProfessionnelPart2" 
        component={InscriptionProfessionnelPart2} 
        options={{ title: 'Informations Professionnelles' }} 
      />
      <Stack.Screen 
        name="SelectionMotif" 
        component={SelectionMotifScreen} 
        options={{ title: 'Sélection du motif' }} 
      />
      <Stack.Screen 
        name="SelectionDate" 
        component={SelectionDateScreen} 
        options={{ title: 'Choix de la date' }} 
      />
      <Stack.Screen 
        name="CreationCompte" 
        component={CreationCompteScreen} 
        options={{ title: 'Création de compte' }} 
      />
      <Stack.Screen 
        name="Confirmation" 
        component={ConfirmationScreen} 
        options={{ title: 'Confirmation' }} 
      />
      <Stack.Screen 
        name="OTPVerification" 
        component={OTPVerification} 
        options={{ title: 'Vérification OTP' }} 
      />
      <Stack.Screen 
        name="AvocatProfile" 
        component={AvocatProfileScreen} 
        options={{ title: 'Profil Avocat' }} 
      />
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ title: 'Tableau de bord' }} 
      />
      <Stack.Screen 
        name="EditUser" 
        component={EditUserScreen} 
        options={{ title: 'Modifier mon profil' }} 
      />
    </Stack.Navigator>
  );
}
