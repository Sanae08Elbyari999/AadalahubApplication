import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native'; 

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image 
          style={styles.img}
          source={require('../../assets/images/menu.png')} 
        />
      </TouchableOpacity>
      
      <Image 
        style={styles.img}
        source={require('../../assets/images/bell.png')} 
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.menuText}>Mon Profil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('InscriptionProfessionnel'); 
              }}>
              <Text style={styles.menuText}>Rejoindre notre réseau d'avocats</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Mes favoris</Text>
            </TouchableOpacity>

            <TouchableOpacity 
             style={styles.menuItem}
             onPress={() => { setModalVisible(false); navigation.navigate('Dashboard'); }}>
              <Text style={styles.menuText}>Tableau de bord</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}