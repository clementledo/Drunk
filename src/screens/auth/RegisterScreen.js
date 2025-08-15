import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {authService} from '../../services/api/authService';
import {loginStart, loginSuccess, loginFailure} from '../../store/slices/authSlice';

const RegisterScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);

  const updateFormData = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: null}));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirmez votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    dispatch(loginStart());
    
    try {
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };
      
      const response = await authService.register(userData);
      dispatch(loginSuccess({
        token: response.token,
        refreshToken: response.refreshToken,
        user: response.user,
      }));
    } catch (error) {
      dispatch(loginFailure(error.message || 'Erreur lors de l\'inscription'));
      Alert.alert('Erreur', error.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <Text style={styles.title}>Inscription</Text>
            <Text style={styles.subtitle}>
              Créez votre compte
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Prénom"
              value={formData.firstName}
              onChangeText={(value) => updateFormData('firstName', value)}
              placeholder="Votre prénom"
              autoCapitalize="words"
              leftIcon="person"
              error={errors.firstName}
            />

            <Input
              label="Nom"
              value={formData.lastName}
              onChangeText={(value) => updateFormData('lastName', value)}
              placeholder="Votre nom"
              autoCapitalize="words"
              leftIcon="person"
              error={errors.lastName}
            />

            <Input
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              placeholder="votre@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="email"
              error={errors.email}
            />

            <Input
              label="Mot de passe"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              placeholder="Votre mot de passe"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="lock"
              error={errors.password}
            />

            <Input
              label="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              placeholder="Confirmez votre mot de passe"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="lock"
              error={errors.confirmPassword}
            />

            <Button
              title="S'inscrire"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />

            <Button
              title="Déjà un compte ? Se connecter"
              onPress={() => navigation.navigate('Login')}
              variant="secondary"
              style={styles.loginButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 20,
    marginBottom: 16,
  },
  loginButton: {
    marginBottom: 20,
  },
});

export default RegisterScreen;
