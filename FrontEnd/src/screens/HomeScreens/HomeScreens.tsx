import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Platform, StatusBar, StyleSheet,RefreshControl,
  Text
} from 'react-native';
import Header from '../../components/Header/Header';
import MainNews from '../../components/MainNews/MainNews';
import SearchBar from '../../components/SearchBar/SearchBar';
import AllListAvocat from '../../components/AllListAvocat/AllListAvocat';
import { Avocat } from '../../types/navigation';
import axios from 'axios';

const API_URL = 'http://192.168.100.249:8082/api/avocat_details';

const HomeScreens = () => {
  const [avocats, setAvocats] = useState<Avocat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchAvocats = async () => {
    try {
      const response = await axios.get(API_URL);

      const avocatsData = response.data.map((avocat: any) => ({
  id: avocat.id,
  title: avocat.title || '!!!!', 
  prenom: avocat.prenom || '',
  nom: avocat.nom || 'Nom non disponible',
  specialites: avocat.specialites || 'Spécialité non spécifiée',
  officeAddress: avocat.officeAddress || '',
  ville: avocat.ville || '',
  pays: avocat.pays || '',
  officeTelephone: avocat.officeTelephone || '',
  tarifConsultation: avocat.tarifConsultation || '',
  descriptionCourte: avocat.descriptionCourte || '',
  description: avocat.description || '',
}));
      setAvocats(avocatsData);
    } catch (err) {
      setError('Erreur lors du chargement des avocats');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAvocats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAvocats();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fixedSection}>
        <Header />
        <MainNews />
        <SearchBar onSearch={onRefresh} />
      </View>
      <ScrollView 
        style={styles.scrollSection}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <AllListAvocat avocats={avocats} refreshAvocats={onRefresh} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  fixedSection: {
    zIndex: 0, 
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 0.2 },
    shadowRadius: 1,
    elevation: 3,
    paddingTop: 10, 
  },
  scrollSection: {
    flex: 1,
    marginTop: 0, 
  },
  scrollContent: {
    paddingTop: 0, 
    paddingBottom: 20 
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default HomeScreens;