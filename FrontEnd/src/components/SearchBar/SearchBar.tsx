import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native';
import styles from './styles';

interface Avocat {
  id: number;
  nom: string;
  
}

interface SearchBarProps {
  onSearch: (results: Avocat[]) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCity, setSelectedCity] = useState('Où ?');
  const [showCities, setShowCities] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Office');
  const [selectedService, setSelectedService] = useState('Tous');
  const [showServices, setShowServices] = useState(false);

  const filters = ['En ligne', 'Office'];
  const cities = ['Casablanca', 'Fès', 'Marrakech', 'Rabat', 'Tanger', 'Agadir'];
  const services = [
    'Tous',
    'Assistance à la rédaction de consultation',
    'Préparation de dossier judiciaire',
    'Conseil en litige personnel ou professionnel',
    'Consultation juridique classique'
  ];

  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const queryParams: any = {};

      if (selectedFilter === 'En ligne') {
        queryParams.disponibleEnLigne = true;
      } else if (selectedFilter === 'Office') {
        queryParams.disponibleAuCabinet = true;
      }

      if (selectedCity && selectedCity !== 'Où ?') {
        queryParams.ville = selectedCity;
      }

      if (selectedService && selectedService !== 'Tous') {
        queryParams.services = selectedService;
      }

      if (searchText) {
        queryParams.specialites = searchText;
      }

      const response = await axios.get('http://100.72.105.185:8082/api/avocat_details', {
        params: queryParams
      });

      
      if (!response.data || response.data.length === 0) {
        setSearchError("Aucun avocat trouvé avec ces critères de recherche.");
        onSearch([]); 
        return;
      }

      setSearchError(null);

      const sortedResults = sortAvocats(response.data, searchText);
      onSearch(sortedResults);

    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
      setSearchError("Une erreur s'est produite lors de la recherche. Veuillez réessayer.");
      onSearch([]);
    }
  };


  const sortAvocats = (avocats: Avocat[], searchTerm: string): Avocat[] => {
    if (!searchTerm) return avocats;

    return [...avocats].sort((a, b) => {
      if (a.nom.toLowerCase() === searchTerm.toLowerCase()) return -1;
      if (b.nom.toLowerCase() === searchTerm.toLowerCase()) return 1;

      const aStartsWith = a.nom.toLowerCase().startsWith(searchTerm.toLowerCase());
      const bStartsWith = b.nom.toLowerCase().startsWith(searchTerm.toLowerCase());
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      const aIncludes = a.nom.toLowerCase().includes(searchTerm.toLowerCase());
      const bIncludes = b.nom.toLowerCase().includes(searchTerm.toLowerCase());
      if (aIncludes && !bIncludes) return -1;
      if (!aIncludes && bIncludes) return 1;

    
      return 0;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTextPart1}>Trouvez</Text>
        <Text style={styles.headerTextPart2}> votre avocat ou consultant juridique</Text>
      </View>


      <View style={styles.topRow}>
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilter
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Spécialité, nom ou domaine..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.citySelector}
          onPress={() => setShowCities(true)}
        >
          <Text style={styles.cityText}>{selectedCity}</Text>
          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Recherche</Text>
        </TouchableOpacity>
      </View>

     
      <TouchableOpacity
        style={styles.serviceButton}
        onPress={() => setShowServices(true)}
      >
        <Text
          style={styles.serviceButtonText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedService === 'Tous' ? 'Tous' : selectedService}
        </Text>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>▼</Text>
        </View>
      </TouchableOpacity>

   
      <Modal visible={showCities} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={cities}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => {
                    setSelectedCity(item);
                    setShowCities(false);
                  }}
                >
                  <Text style={styles.cityItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

   
      <Modal visible={showServices} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={services}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.cityItem,
                    selectedService === item && styles.selectedItem
                  ]}
                  onPress={() => {
                    setSelectedService(item);
                    setShowServices(false);
                  }}
                >
                  <Text style={styles.cityItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchBar;
