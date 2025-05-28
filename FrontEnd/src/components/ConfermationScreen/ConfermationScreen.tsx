import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ConfirmationScreenRouteProp>();
  const { date, hour } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rendez-vous confirmé</Text>
      
      <Text style={styles.text}>Date: {date}</Text>
      <Text style={styles.text}>Heure: {hour}</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2E4E3F',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2E4E3F',
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;