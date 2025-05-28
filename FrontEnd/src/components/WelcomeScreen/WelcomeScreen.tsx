import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WelcomeScreenNavigationProp } from '../../types/navigation';

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 8000); 

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/welcome.jpg')} 
        style={styles.image}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue !</Text>
        <Text style={styles.subtitle}>Commencez votre accompagnement juridique</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    fontStyle: 'italic',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 30,
  },
});

export default WelcomeScreen;