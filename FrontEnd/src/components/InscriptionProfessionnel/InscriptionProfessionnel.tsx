import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InscriptionProfessionnelPart2NavigationProp } from '../types/navigation';


const InscriptionProfessionnel = () => {
  const navigation = useNavigation<InscriptionProfessionnelPart2NavigationProp>();
  const [formData, setFormData] = useState({
    title: 'Dr.',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleChange = (name: keyof typeof formData, value: string | boolean) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

const handleNext = () => {
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
    Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
    return;
  }

  if (!validateEmail(formData.email)) {
    Alert.alert('Erreur', 'Veuillez entrer une adresse email valide');
    return;
  }

  if (formData.password.length < 8) {
    Alert.alert('Erreur', 'Le mot de passe doit comporter au moins 8 caractères');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
    return;
  }

navigation.navigate('InscriptionProfessionnelPart2', { 
  baseData: {
    title: formData.title,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password
  }
});
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Créez votre profil AdalaHub</Text>
      
      {/* Section Titre */}
      <Text style={styles.sectionTitle}>Titre *</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity 
          style={[styles.radioOption, formData.title === 'Dr.' && styles.radioSelected]}
          onPress={() => handleChange('title', 'Dr.')}
        >
          <View style={styles.radioCircle}>
            {formData.title === 'Dr.' && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioLabel}>Dr.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.radioOption, formData.title === 'Maitre' && styles.radioSelected]}
          onPress={() => handleChange('title', 'Maitre')}
        >
          <View style={styles.radioCircle}>
            {formData.title === 'Maitre' && <View style={styles.radioInnerCircle} />}
          </View>
          <Text style={styles.radioLabel}>Maitre</Text>
        </TouchableOpacity>
      </View>

      {/* Section Informations de base */}
      <Text style={styles.label}>Prénom *</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre prénom"
        value={formData.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
      />

      <Text style={styles.label}>Nom *</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre nom"
        value={formData.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
      />

      <Text style={styles.label}>E-mail *</Text>
      <Text style={styles.note}>Uniquement pour vous communiquer des informations importantes.</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <Text style={styles.label}>Mot de passe *</Text>
      <Text style={styles.note}>Le mot de passe doit comporter au moins 8 caractères</Text>
      <TextInput
        style={styles.input}
        placeholder="Créez un mot de passe"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
      />

      <Text style={styles.label}>Confirmer votre mot de passe *</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmez le mot de passe"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
      />

      {/* Bouton Suivant */}
      <TouchableOpacity 
        style={[styles.nextButton, isSubmitting && styles.disabledButton]}
        onPress={handleNext}
        disabled={isSubmitting}
      >
        <Text style={styles.nextButtonText}>
          {isSubmitting ? 'Traitement...' : 'Suivant'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 25,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioSelected: {
    backgroundColor: '#FFFF',
    padding: 6,
    borderRadius: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#BBCF25',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#BBCF25',
  },
  radioLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  note: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    fontSize: 15,
  },
  nextButton: {
    backgroundColor: '#BBCF25',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InscriptionProfessionnel; 