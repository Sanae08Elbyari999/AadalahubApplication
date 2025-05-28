import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type SelectionDateRouteParams = {
  avocatId: number;
  motif: string;
};

type DayType = {
  dateObj: Date;
  display: string;
  dateString: string;
};

const SelectionDateScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'SelectionDate'>>();
  const { avocatId, motif } = route.params as SelectionDateRouteParams;
  
  const [selectedDate, setSelectedDate] = useState<DayType | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const getNextDays = (): DayType[] => {
    const days: DayType[] = [];
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      days.push({
        dateObj: date,
        display: `${dayNames[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]}`,
        dateString
      });
    }
    return days;
  };

  const availableHours = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleConfirm = () => {
    if (!selectedDate || !selectedHour) {
      Alert.alert('Erreur', 'Veuillez sélectionner une date et une heure');
      return;
    }

    const dateTime = `${selectedDate.dateString}T${selectedHour}:00`;
    
    navigation.navigate('CreationCompte', {
      avocatId,
      motif,
      dateHeure: dateTime
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choisissez une date</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {getNextDays().map((day) => (
          <TouchableOpacity
            key={day.dateString}
            style={[
              styles.dateButton,
              selectedDate?.dateString === day.dateString && styles.selectedDate
            ]}
            onPress={() => setSelectedDate(day)}
          >
            <Text style={styles.dayName}>{day.display.split(' ')[0]}</Text>
            <Text style={styles.dayNumber}>{day.display.split(' ')[1]}</Text>
            <Text style={styles.monthName}>{day.display.split(' ')[2]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Choisissez une heure</Text>
      
      <View style={styles.hoursGrid}>
        {availableHours.map((hour) => (
          <TouchableOpacity
            key={hour}
            style={[
              styles.hourButton,
              selectedHour === hour && styles.selectedHour
            ]}
            onPress={() => setSelectedHour(hour)}
          >
            <Text style={[
              styles.hourText,
              selectedHour === hour && styles.selectedHourText
            ]}>
              {hour}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
            (!selectedDate || !selectedHour) && styles.disabledButton
          ]}
          onPress={handleConfirm}
          disabled={!selectedDate || !selectedHour}
        >
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  dateButton: {
    width: 85,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedDate: {
    backgroundColor: '#A5D6A7',
    borderColor: '#66BB6A',
  },
  dayName: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  monthName: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 30,
    marginBottom: 15,
  },
  hoursGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hourButton: {
    width: '30%',
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedHour: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  hourText: {
    color: '#333',
    fontSize: 16,
  },
  selectedHourText: {
    color: '#FFF',
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  backButton: {
    backgroundColor: '#BDBDBD',
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#C8E6C9',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});


export default SelectionDateScreen;