import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

const motifs = [
  'Problème familial (divorce, garde, héritage)',
  'Problème de location ou achat immobilier',
  'Conflit avec une entreprise ou client',
  'Réclamation administrative ou judiciaire'
];

type SelectionMotifRouteParams = {
  avocatId: number;
};

const SelectionMotifScreen = () => {
  const [selectedMotif, setSelectedMotif] = useState<string>('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'SelectionMotif'>>();

  if (!route.params?.avocatId) {
    Alert.alert('Erreur', 'Avocat non spécifié', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
    return null;
  }

  const { avocatId } = route.params as SelectionMotifRouteParams;

  const handleNext = () => {
    if (!selectedMotif) {
      Alert.alert('Erreur', 'Veuillez sélectionner un motif');
      return;
    }

    navigation.navigate('SelectionDate', {
      avocatId,
      motif: selectedMotif
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <Text style={styles.title}>Sélectionnez votre motif</Text>
      <View style={styles.spacer} />
      {motifs.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.motifButton,
            selectedMotif === item && styles.selectedMotif
          ]}
          onPress={() => setSelectedMotif(item)}
        >
          <Text style={[
            styles.motifText,
            selectedMotif === item && styles.selectedMotifText
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedMotif && styles.disabledButton
          ]}
          onPress={handleNext}
          disabled={!selectedMotif}
        >
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#5c5c5c',
    textAlign: 'center',
    marginBottom: 24,
  },
  motifButton: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#d0cecf',
    borderWidth: 1.5,
  },
  selectedMotif: {
    backgroundColor: '#ddecb2',
  },
  motifText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedMotifText: {
    color: '#000',
    fontWeight: 'normal',
  },
  spacer: {
    height: 30, 
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#ced0d4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#BBCF25',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default SelectionMotifScreen;
