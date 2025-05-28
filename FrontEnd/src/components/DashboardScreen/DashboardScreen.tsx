import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; 

type UserRole = 'client' | 'avocat' | 'admin';

interface RendezVous {
  id: string;
  date: string;
  heure: string;
  avocat?: { nom: string; prenom: string };
  client?: { nom: string; prenom: string };
  motif: string;
  status: string;
}

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
}

// Fonction fictive à remplacer par votre vraie méthode d'obtention du token
const getAuthToken = async (): Promise<string> => {
  return 'votre_token_ici';
};

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user: authUser } = useContext(AuthContext); 
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const userRole = authUser?.role || 'client';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getAuthToken(); 
        
        if (userRole === 'client') {
          const res = await axios.get('http://192.168.100.249:8082/api/client/rendezvous', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setRendezVous(res.data);
        } else if (userRole === 'avocat') {
          const res = await axios.get('http://192.168.100.249:8082/api/avocat/rendezvous', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setRendezVous(res.data);
        } else if (userRole === 'admin') {
          const [clientsRes, avocatsRes] = await Promise.all([
            axios.get('http://192.168.100.249:8082/api/clients', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://192.168.100.249:8082/api/avocat_details', {
              headers: { Authorization: `Bearer ${token}` }
            }),
          ]);
          setUsers([...clientsRes.data, ...avocatsRes.data]);
        }
      } catch (error: any) {
        console.error('Erreur API:', error);
        if (error.response?.status === 401) {
          Alert.alert('Erreur', 'Session expirée, veuillez vous reconnecter');
          navigation.navigate('Login');
        } else {
          Alert.alert('Erreur', error.response?.data?.message || 'Erreur de chargement');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userRole, navigation]);

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = await getAuthToken();
      await axios.delete(`http://192.168.100.249:8082/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u.id !== userId));
      Alert.alert('Succès', 'Utilisateur supprimé');
    } catch (error: any) {
      Alert.alert('Erreur', error.response?.data?.message || 'Suppression échouée');
    }
  };

  const handleEditUser = (userId: string, userRole: UserRole) => {
    navigation.navigate('EditUser', { userId, userRole });
  };

  const renderClientView = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mes Rendez-Vous</Text>
      {rendezVous.length === 0 ? (
        <Text style={styles.emptyText}>Aucun rendez-vous</Text>
      ) : (
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Heure</Text>
            <Text style={styles.headerText}>Avocat</Text>
            <Text style={styles.headerText}>Motif</Text>
          </View>
          {rendezVous.map((rdv) => (
            <View key={rdv.id} style={styles.tableRow}>
              <Text style={styles.cellText}>{rdv.date}</Text>
              <Text style={styles.cellText}>{rdv.heure}</Text>
              <Text style={styles.cellText}>{rdv.avocat?.prenom} {rdv.avocat?.nom}</Text>
              <Text style={styles.cellText}>{rdv.motif}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderAvocatView = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mes Rendez-Vous Clients</Text>
      {rendezVous.length === 0 ? (
        <Text style={styles.emptyText}>Aucun rendez-vous</Text>
      ) : (
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Heure</Text>
            <Text style={styles.headerText}>Client</Text>
            <Text style={styles.headerText}>Motif</Text>
            <Text style={styles.headerText}>Statut</Text>
          </View>
          {rendezVous.map((rdv) => (
            <View key={rdv.id} style={styles.tableRow}>
              <Text style={styles.cellText}>{rdv.date}</Text>
              <Text style={styles.cellText}>{rdv.heure}</Text>
              <Text style={styles.cellText}>{rdv.client?.prenom} {rdv.client?.nom}</Text>
              <Text style={styles.cellText}>{rdv.motif}</Text>
              <Text style={[styles.cellText, rdv.status === 'confirmé' ? styles.confirmed : styles.pending]}>
                {rdv.status}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderAdminView = () => (
    <View>
      {['avocat', 'client'].map(role => (
        <View key={role} style={styles.section}>
          <Text style={styles.sectionTitle}>Gestion des {role === 'avocat' ? 'Avocats' : 'Clients'}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddUser', { role })}
          >
            <Text style={styles.addButtonText}>+ Ajouter un {role}</Text>
          </TouchableOpacity>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Nom</Text>
              <Text style={styles.headerText}>Prénom</Text>
              <Text style={styles.headerText}>Email</Text>
              <Text style={styles.headerText}>Actions</Text>
            </View>
            {users.filter(u => u.role === role).map((user) => (
              <View key={user.id} style={styles.tableRow}>
                <Text style={styles.cellText}>{user.nom}</Text>
                <Text style={styles.cellText}>{user.prenom}</Text>
                <Text style={styles.cellText}>{user.email}</Text>
                <View style={styles.actionsCell}>
                  <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => handleEditUser(user.id, user.role)}
                  >
                    <Text style={styles.buttonText}>Modifier</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => handleDeleteUser(user.id)}
                  >
                    <Text style={styles.buttonText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tableau de Bord - {authUser?.prenom} {authUser?.nom}</Text>
      {loading ? (
        <Text style={styles.loadingText}>Chargement...</Text>
      ) : (
        <>
          {userRole === 'client' && renderClientView()}
          {userRole === 'avocat' && renderAvocatView()}
          {userRole === 'admin' && renderAdminView()}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  section: { marginBottom: 30, backgroundColor: '#fff', borderRadius: 10, padding: 15, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#2E4E3F' },
  table: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#2E4E3F', paddingVertical: 10 },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ddd' },
  headerText: { flex: 1, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  cellText: { flex: 1, textAlign: 'center', color: '#333', paddingVertical: 5 },
  emptyText: { textAlign: 'center', fontStyle: 'italic', color: '#888', marginVertical: 20 },
  confirmed: { color: 'green', fontWeight: 'bold' },
  pending: { color: 'orange', fontWeight: 'bold' },
  addButton: { 
    marginVertical: 10, 
    backgroundColor: '#2E4E3F', 
    padding: 10, 
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  actionsCell: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
  },
});

export default DashboardScreen;
