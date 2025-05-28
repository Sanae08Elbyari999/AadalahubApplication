import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  OTPVerification: {
    phoneNumber: string;
  };
  Home: undefined;
};

type OTPVerificationRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;
type OTPVerificationNavigationProp = StackNavigationProp<RootStackParamList, 'OTPVerification'>;

interface OTPVerificationProps {
  route: OTPVerificationRouteProp;
  navigation: OTPVerificationNavigationProp;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ route, navigation }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [showSuccess, setShowSuccess] = useState(false);
  const { phoneNumber } = route.params;

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    console.log('OTP entré:', enteredOtp);

    if (enteredOtp.length === 4) {
      setShowSuccess(true); 
    }
  };

  const handleResend = () => {
    console.log('Demande de renvoi OTP à', phoneNumber);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleContinue = () => {
    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vérification OTP</Text>
      <Text style={styles.subHeader}>Code envoyé au {phoneNumber}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            selectTextOnFocus
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
        <Text style={styles.resendText}>Renvoyer le code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.verifyButton, { opacity: otp.join('').length === 4 ? 1 : 0.5 }]}
        onPress={handleVerify}
        disabled={otp.join('').length !== 4}
      >
        <Text style={styles.verifyButtonText}>Vérifier</Text>
      </TouchableOpacity>

      {showSuccess && (
        <View style={styles.successContainer}>
          <Image
            source={require('../../assets/images/Success.jpg')}
            style={styles.successImage}
          />
          <Text style={styles.successText}>Rendez-vous prêt avec succès !</Text>
          <Text style={styles.successSubText}>Soyez à l'heure pour votre consultation.</Text>

          <TouchableOpacity style={styles.successButton} onPress={handleContinue}>
            <Text style={styles.successButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 40,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: 60,
    height: 60,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  resendText: {
    color: '#1AE185',
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: '#1AE185',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  successImage: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  successButton: {
    backgroundColor: '#1AE185',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  successButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPVerification;
