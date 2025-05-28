import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AvocatProfileNavigationProp, Avocat } from '../../types/navigation';

type AllListAvocatProps = {
  avocats: Avocat[];
  refreshAvocats: () => void;
};

const AllListAvocat: React.FC<AllListAvocatProps> = ({ avocats }) => {
  const navigation = useNavigation<AvocatProfileNavigationProp>();

  const handleProfilePress = (avocat: Avocat) => {
    navigation.navigate('AvocatProfile', { avocat });
  };

  if (avocats.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun avocat disponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={avocats}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/images/user.jpg')}
            />
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardName}>
                  {item.title ? `${item.title} ` : ''}
                  {item.prenom} {item.nom}
                </Text>
                <Text style={styles.cardSpecialite}>{item.specialites}</Text>
              </View>
              <View style={styles.cardButtonsContainer}>
                <TouchableOpacity
                  style={styles.cardButton}
                  onPress={() => handleProfilePress(item)}
                >
                  <Text style={styles.cardButtonText}>Voir profil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  cardContainer: ViewStyle;
  cardImage: ImageStyle;
  cardContent: ViewStyle;
  cardName: TextStyle;
  cardSpecialite: TextStyle;
  cardButtonsContainer: ViewStyle;
  cardButton: ViewStyle;
  cardButtonText: TextStyle;
  emptyContainer: ViewStyle;
  emptyText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderWidth: 0.8,
    borderColor: '#BBCF25',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  cardSpecialite: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  cardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  cardButton: {
    backgroundColor: '#BBCF25',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default AllListAvocat;
