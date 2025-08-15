import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../components/common/Button';
import {setCurrentScreen} from '../store/slices/appSlice';
import {logout} from '../store/slices/authSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(setCurrentScreen('Profile'));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEditProfile = () => {
    // Navigation vers l'écran d'édition du profil
    console.log('Edit profile');
  };

  const profileItems = [
    {
      icon: 'person',
      title: 'Modifier le profil',
      subtitle: 'Nom, email, photo',
      onPress: handleEditProfile,
    },
    {
      icon: 'lock',
      title: 'Sécurité',
      subtitle: 'Mot de passe, authentification',
      onPress: () => console.log('Security'),
    },
    {
      icon: 'notifications',
      title: 'Notifications',
      subtitle: 'Préférences de notification',
      onPress: () => console.log('Notifications'),
    },
    {
      icon: 'privacy-tip',
      title: 'Confidentialité',
      subtitle: 'Paramètres de confidentialité',
      onPress: () => console.log('Privacy'),
    },
    {
      icon: 'help',
      title: 'Aide & Support',
      subtitle: 'FAQ, Contact',
      onPress: () => console.log('Help'),
    },
    {
      icon: 'info',
      title: 'À propos',
      subtitle: 'Version de l\'app, Mentions légales',
      onPress: () => console.log('About'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Header avec photo de profil */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{uri: user.avatar}} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="person" size={40} color="#FFFFFF" />
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="edit" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Statistiques utilisateur */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Tâches</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>89</Text>
            <Text style={styles.statLabel}>Complétées</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Jours actifs</Text>
          </View>
        </View>

        {/* Menu des paramètres */}
        <View style={styles.menuContainer}>
          {profileItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === profileItems.length - 1 && styles.lastMenuItem,
              ]}
              onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIcon}>
                  <Icon name={item.icon} size={20} color="#007AFF" />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color="#C7C7CC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bouton de déconnexion */}
        <View style={styles.logoutContainer}>
          <Button
            title="Se déconnecter"
            onPress={handleLogout}
            variant="danger"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8E8E93',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#8E8E93',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 20,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  logoutContainer: {
    marginTop: 20,
  },
  logoutButton: {
    width: '100%',
  },
});

export default ProfileScreen;
