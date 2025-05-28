import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, ImageBackground } from 'react-native';
import styles from './styles';
import axios from 'axios';

export default function MainNews() {
  
  return (
    <ImageBackground source={require('../../assets/images/tribunal.jpg')} style={styles.container}>
    </ImageBackground>
    
  )
}