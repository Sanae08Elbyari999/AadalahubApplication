import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Client } from '../types/navigation';
import axios from 'axios';

const API_URL = 'http://192.168.100.249:8082';

type CreationCompteRouteParams = {
  avocatId: number;
  motif: string;
  dateHeure: string;
};

type ClientData = {
  id: number;
  prenom: string;
  nom: string;
  telephone: string;
  age: number;
  email: string;
  password: string;
};

const CreationCompteScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  const params = route.params as Partial<CreationCompteRouteParams> | undefined;

  if (!params || !params.avocatId || !params.motif || !params.dateHeure) {
    Alert.alert('Erreur', 'Les paramètres avocatId, motif ou dateHeure sont manquants.');
    navigation.goBack();
    return null;
  }

  const { avocatId, motif, dateHeure } = params;

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('06010320');
  const [age, setAge] = useState('43');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prenom || !nom || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Tous les champs avec * sont obligatoires');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);

    try {
      const clientResponse = await axios.post<ClientData>(`${API_URL}/api/clients`, {
        prenom,
        nom,
        telephone,
        age: parseInt(age),
        email,
        password,
      });

      await axios.post(`${API_URL}/api/rendezvous`, null, {
        params: {
          avocatId,
          clientId: clientResponse.data.id,
          motif,
          dateHeure,
        },
      });

      navigation.navigate('OTPVerification', {
        phoneNumber: telephone,
        clientData: clientResponse.data as Client,
      });
    } catch (error: any) {
      let message = 'Erreur inconnue';
      if (error.response) {
        message = `Erreur ${error.response.status}: ${JSON.stringify(error.response.data)}`;
      } else if (error.message) {
        message = error.message;
      }
      Alert.alert('Erreur', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Prénom*</Text>
          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={setPrenom}
            placeholder="Ex: Amine"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Nom*</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="Ex: El Idrissi"
          />
        </View>
      </View>

   
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Téléphone</Text>
          <TextInput
            style={styles.input}
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Âge</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </View>
      </View>

      
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Email*</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="exemple@mail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Mot de passe*</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mot de passe"
          secureTextEntry
        />
      </View>

      {/* Confirmation */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Confirmer le mot de passe*</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Répéter le mot de passe"
          secureTextEntry
        />
      </View>

     
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirmer</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2E4E3F',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
    marginBottom: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#bfbfbf',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#e2dd3c',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default CreationCompteScreen;
