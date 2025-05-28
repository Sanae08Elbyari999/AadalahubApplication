import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export interface Avocat {
  id: number;
  titre?: string;
  prenom: string;
  nom: string;
  specialites: string;
  description?: string;
  officeAddress?: string;
  ville?: string;
  pays?: string;
  officeTelephone?: string;
  tarifConsultation?: string;
}

export interface Client {
  id?: number;
  prenom: string;
  nom: string;
  telephone: string;
  age: number;
  email: string;
}

export type RootStackParamList = {
  Home: undefined;
  AvocatProfile: { avocat: Avocat };
  SelectionMotif: { avocatId: number };
  SelectionDate: { avocatId: number; motif: string };
  CreationCompte: {
    avocatId: number;
    motif: string;
    dateHeure: string;
  };
  Dashboard: undefined;
  OTPVerification: {
    phoneNumber: string;
    clientData: Client;
  };
  Confirmation: { 
    date: string;
    hour: string;
    avocat: Avocat;
  };
  InscriptionProfessionnel: undefined;
  InscriptionProfessionnelPart2: {
    baseData: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
  };
  EditUser: { 
    userId: string;
    userRole?: 'client' | 'avocat' | 'admin';
  };
  ForgotPassword: undefined;
  Login: undefined;
  SignUp: undefined;
  Welcome: undefined;

  
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type AvocatProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AvocatProfile'
>;

export type AvocatProfileRouteProp = RouteProp<RootStackParamList, 'AvocatProfile'>;

export type SelectionMotifNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SelectionMotif'
>;

export type SelectionDateNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SelectionDate'
>;

export type CreationCompteNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreationCompte'
>;

export type OTPVerificationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OTPVerification'
>;

export type ConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

export type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;

export type InscriptionProfessionnelNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InscriptionProfessionnel'
>;

export type InscriptionProfessionnelPart2NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InscriptionProfessionnelPart2'
>;

export type SelectionMotifScreenRouteProp = RouteProp<RootStackParamList, 'SelectionMotif'>;

export type SelectionMotifScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SelectionMotif'
>;

export type EditUserScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditUser'
>;

// Ajout pour DashboardScreen
export type DashboardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
