import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import axios from 'axios';

type EditUserRouteProp = RouteProp<RootStackParamList, 'EditUser'>;

const EditUserScreen = ({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'EditUser'> }) => {
  const route = useRoute<EditUserRouteProp>();
  const { userId, userRole: initialRole } = route.params;

  
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    role: initialRole || 'client' as 'client' | 'avocat' | 'admin',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://192.168.100.249:8082/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de charger les données utilisateur');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://192.168.100.249:8082/api/users/${userId}`, user);
      Alert.alert('Succès', 'Utilisateur mis à jour avec succès');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', 'Échec de la mise à jour');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Modifier l'utilisateur</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={user.nom}
          onChangeText={(text) => setUser({...user, nom: text})}
          placeholder="Entrez le nom"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          value={user.prenom}
          onChangeText={(text) => setUser({...user, prenom: text})}
          placeholder="Entrez le prénom"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={(text) => setUser({...user, email: text})}
          placeholder="Entrez l'email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Rôle</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={[styles.radioButton, user.role === 'client' && styles.radioButtonSelected]}
            onPress={() => setUser({...user, role: 'client'})}
          >
            <Text style={user.role === 'client' ? styles.radioTextSelected : styles.radioText}>Client</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.radioButton, user.role === 'avocat' && styles.radioButtonSelected]}
            onPress={() => setUser({...user, role: 'avocat'})}
          >
            <Text style={user.role === 'avocat' ? styles.radioTextSelected : styles.radioText}>Avocat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.radioButton, user.role === 'admin' && styles.radioButtonSelected]}
            onPress={() => setUser({...user, role: 'admin'})}
          >
            <Text style={user.role === 'admin' ? styles.radioTextSelected : styles.radioText}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateUser}>
        <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E4E3F',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  radioButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#2E4E3F',
    borderColor: '#2E4E3F',
  },
  radioText: {
    color: '#333',
  },
  radioTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#2E4E3F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditUserScreen;