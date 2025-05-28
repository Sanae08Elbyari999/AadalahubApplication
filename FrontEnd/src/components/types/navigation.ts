import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export interface Avocat {
  id: number;
  nom: string;
  prenom: string;
  title?: string;
  specialites: string;
  descriptionCourte: string;
  officeAddress: string;
  ville: string;
  pays: string;
  officeTelephone: string;
  tarifConsultation: number;
  description: string;
  Dashboard: undefined;

}

export interface Client {

}

export type RootStackParamList = {
  Login: undefined;
  Welcome: undefined;
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
  ForgotPassword: undefined;
  SignUp: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type CreateAccountNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreationCompte'
>;

export type InscriptionProfessionnelNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InscriptionProfessionnel'
>;

export type InscriptionProfessionnelPart2NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InscriptionProfessionnelPart2'
>;

export type SelectionMotifNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SelectionMotif'
>;

export type SelectionDateNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SelectionDate'
>;

export type ConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

export type OTPVerificationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OTPVerification'
>;

export type AvocatProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AvocatProfile'
>;


export type LoginScreenRouteProp = RouteProp<
  RootStackParamList,
  'Login'
>;

export type WelcomeScreenRouteProp = RouteProp<
  RootStackParamList,
  'Welcome'
>;

export type InscriptionProfessionnelPart2RouteProp = RouteProp<
  RootStackParamList,
  'InscriptionProfessionnelPart2'
>;

export type ConfirmationScreenRouteProp = RouteProp<
  RootStackParamList,
  'Confirmation'
>;

export type OTPVerificationRouteProp = RouteProp<
  RootStackParamList,
  'OTPVerification'
>;

export type AvocatProfileRouteProp = RouteProp<
  RootStackParamList,
  'AvocatProfile'
>;