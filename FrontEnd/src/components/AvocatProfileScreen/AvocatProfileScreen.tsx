import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';




interface Avocat {
  id: string; 
  title?: string;
  prenom: string;
  nom: string;
  specialites: string;
  description: string;
  officeAddress: string;
  ville: string;
  pays: string;
  officeTelephone: string;

}

interface AvocatProfileRouteParams {
  avocat: Avocat;
}

type AvocatProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AvocatProfile'
>;

const AvocatProfileScreen: React.FC = () => {
  const navigation = useNavigation<AvocatProfileNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'AvocatProfile'>>();
  const { avocat } = route.params as unknown as AvocatProfileRouteParams; 

  const handleTakeAppointment = () => {
    navigation.navigate('SelectionMotif', {avocatId: parseInt(avocat.id, 10) });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image 
          source={require('../../assets/images/maitreF.jpg')} 
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {avocat.title ? `${avocat.title} ` : ''}{avocat.prenom} {avocat.nom}
        </Text>
        <Text style={styles.specialty}>{avocat.specialites}</Text>
        
        <Text style={styles.bio}>{avocat.description}</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Coordonnées</Text>
          <Text style={styles.infoText}>{avocat.officeAddress}</Text>
          <Text style={styles.infoText}>{avocat.ville}, {avocat.pays}</Text>
          <Text style={styles.infoText}>Tél: {avocat.officeTelephone}</Text>
        </View>
      </View>
      
      <View style={styles.consultationSection}>
        <Text style={styles.consultationTitle}>Consultation</Text>
        <Text style={styles.price}>Tarif: 500 MAD</Text>

        <View style={styles.stepsContainer}>
          <Text style={styles.step}>1. Choisissez un créneau</Text>
          <Text style={styles.step}>2. Confirmez le motif</Text>
          <Text style={styles.step}>3. Recevez votre confirmation</Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleTakeAppointment}
        >
          <Text style={styles.buttonText}>Prendre rendez-vous</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#BBCF25',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#33695',
    marginBottom: 6,
  },
  specialty: {
    fontSize: 16,
    fontStyle: 'normal',
    color: '#5c5c5c',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#336950',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  consultationSection: {
    padding: 24,
    marginTop: 20,
  },
  consultationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#336950',
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5c5c5c',
    marginBottom: 18,
  },
  stepsContainer: {
    marginBottom: 24,
  },
  step: {
    fontSize: 14,
    color: '#5c5c5c',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#BBCF25',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#BBCF25',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ffff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AvocatProfileScreen;