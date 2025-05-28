import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import axios from 'axios';

type InscriptionProfessionnelPart2RouteProp = RouteProp<
  RootStackParamList,
  'InscriptionProfessionnelPart2'
>;

const villes = ['Casablanca', 'Fès', 'Marrakech', 'Tanger', 'Rabat', 'Agadir'];
const servicesList = [
  'Tous',
  'Assistance à la rédaction de consultation',
  'Préparation de dossier judiciaire',
  'Conseil en litige personnel ou professionnel',
  'Consultation juridique classique'
];

const InscriptionProfessionnelPart2 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'OTPVerification'>>();
  const route = useRoute<InscriptionProfessionnelPart2RouteProp>();
  const { baseData } = route.params;

  const [formData, setFormData] = useState({
    specialities: '',
    officeAddress: '',
    officePhone: '',
    personalPhone: '',
    country: 'Maroc',
    city: villes[0],
    description: '',
    isCertified: false,
    services: [] as string[],
    disponibleEnLigne: false,
    disponibleAuCabinet: false,
  });

  const handleChange = (name: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.services.includes(service);
      return {
        ...prev,
        services: alreadySelected
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleSubmit = async () => {
    const finalData = {
      titre: baseData.title,
      prenom: baseData.firstName,
      nom: baseData.lastName,
      email: baseData.email,
      password: baseData.password,
      disponibleEnLigne: formData.disponibleEnLigne,
      disponibleAuCabinet: formData.disponibleAuCabinet,
      specialites: formData.specialities,
      officeAddress: formData.officeAddress,
      officeTelephone: formData.officePhone,
      telephonePersonnel: formData.personalPhone,
      pays: formData.country,
      ville: formData.city,
      services: formData.services.join(', '),
      description: formData.description,
      certifie: formData.isCertified,
    };

    try {
      const response = await axios.post('http://192.168.100.249:8082/api/avocat_details', finalData);
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Succès', 'Inscription complète réussie !', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('Home'
              ),
          },
        ]);
      } else {
        Alert.alert('Erreur', response.data?.message || 'Une erreur est survenue');
      }
    } catch (error) {
      let errorMessage = 'Erreur inconnue';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Erreur', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Inscription Professionnel</Text>

      <Text style={styles.sectionTitle}>Spécialités *</Text>
      <TextInput
        style={styles.input}
        value={formData.specialities}
        onChangeText={(text) => handleChange('specialities', text)}
        placeholder="Ex: Droit civil, Droit des affaires"
      />

      <Text style={styles.label}>Adresse d'office *</Text>
      <TextInput
        style={styles.input}
        value={formData.officeAddress}
        onChangeText={(text) => handleChange('officeAddress', text)}
        placeholder="Adresse complète de votre cabinet"
      />

      <Text style={styles.label}>Numéro de Téléphone (Office) *</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={formData.officePhone}
        onChangeText={(text) => handleChange('officePhone', text)}
        placeholder="0601010101"
        maxLength={10}
      />

      <Text style={styles.label}>Numéro de Téléphone *</Text>
      <Text style={styles.note}>Ne sera utilisé que par l'équipe AdalaHub</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={formData.personalPhone}
        onChangeText={(text) => handleChange('personalPhone', text)}
        placeholder="0601010101"
        maxLength={10}
      />

      <Text style={styles.label}>Disponibilité *</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={formData.disponibleEnLigne}
          onValueChange={(value) => handleChange('disponibleEnLigne', value)}
        />
        <Text style={styles.checkboxLabel}>Disponible en ligne</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={formData.disponibleAuCabinet}
          onValueChange={(value) => handleChange('disponibleAuCabinet', value)}
        />
        <Text style={styles.checkboxLabel}>Disponible au cabinet</Text>
      </View>

      <Text style={styles.label}>Pays *</Text>
      <TextInput style={styles.input} value={formData.country} editable={false} />

      <Text style={styles.label}>Ville *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.city}
          onValueChange={(itemValue) => handleChange('city', itemValue)}
        >
          {villes.map((ville) => (
            <Picker.Item key={ville} label={ville} value={ville} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Services proposés *</Text>
      {servicesList.map((service) => (
        <View key={service} style={styles.checkboxContainer}>
          <CheckBox
            value={formData.services.includes(service)}
            onValueChange={() => toggleService(service)}
          />
          <Text style={styles.checkboxLabel}>{service}</Text>
        </View>
      ))}

      <Text style={styles.label}>Description (maximum 1000 mots)</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={formData.description}
        onChangeText={(text) => handleChange('description', text)}
        placeholder="Décrivez votre expérience et spécialités"
        maxLength={1000}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={formData.isCertified}
          onValueChange={(value) => handleChange('isCertified', value)}
        />
        <Text style={styles.checkboxLabel}>
          Je certifie sur l'honneur être un professionnel juridique
        </Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
        <Text style={styles.confirmButtonText}>Soumettre</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F9F9F9',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#222',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: '#222',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 18,
    marginBottom: 6,
    color: '#444',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BBCF25',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#BBCF25',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: Platform.OS === 'android' ? '#FFF' : undefined,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#BBCF25',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#BBCF25',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default InscriptionProfessionnelPart2;
