import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {setCurrentScreen} from '../store/slices/appSlice';
import {
  setTheme,
  setLanguage,
  toggleNotifications,
} from '../store/slices/userSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const {preferences} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(setCurrentScreen('Settings'));
  }, [dispatch]);

  const handleThemeToggle = () => {
    const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language));
  };

  const handleNotificationsToggle = () => {
    dispatch(toggleNotifications());
  };

  const settingsGroups = [
    {
      title: 'Apparence',
      items: [
        {
          icon: 'palette',
          title: 'Mode sombre',
          type: 'switch',
          value: preferences.theme === 'dark',
          onPress: handleThemeToggle,
        },
        {
          icon: 'language',
          title: 'Langue',
          type: 'text',
          value: preferences.language === 'fr' ? 'Français' : 'English',
          onPress: () => {
            const newLang = preferences.language === 'fr' ? 'en' : 'fr';
            handleLanguageChange(newLang);
          },
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: 'notifications',
          title: 'Notifications push',
          type: 'switch',
          value: preferences.notifications,
          onPress: handleNotificationsToggle,
        },
        {
          icon: 'schedule',
          title: 'Rappels',
          type: 'text',
          value: 'Activés',
          onPress: () => console.log('Reminders settings'),
        },
      ],
    },
    {
      title: 'Données',
      items: [
        {
          icon: 'cloud-sync',
          title: 'Synchronisation',
          type: 'text',
          value: 'Automatique',
          onPress: () => console.log('Sync settings'),
        },
        {
          icon: 'storage',
          title: 'Stockage',
          type: 'text',
          value: '245 MB utilisés',
          onPress: () => console.log('Storage settings'),
        },
        {
          icon: 'backup',
          title: 'Sauvegarde',
          type: 'text',
          value: 'Dernière: Aujourd\'hui',
          onPress: () => console.log('Backup settings'),
        },
      ],
    },
    {
      title: 'Sécurité',
      items: [
        {
          icon: 'fingerprint',
          title: 'Authentification biométrique',
          type: 'switch',
          value: false,
          onPress: () => console.log('Biometric auth'),
        },
        {
          icon: 'lock-clock',
          title: 'Verrouillage automatique',
          type: 'text',
          value: '5 minutes',
          onPress: () => console.log('Auto lock'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-outline',
          title: 'Centre d\'aide',
          type: 'text',
          value: '',
          onPress: () => console.log('Help center'),
        },
        {
          icon: 'bug-report',
          title: 'Signaler un problème',
          type: 'text',
          value: '',
          onPress: () => console.log('Report bug'),
        },
        {
          icon: 'rate-review',
          title: 'Évaluer l\'app',
          type: 'text',
          value: '',
          onPress: () => console.log('Rate app'),
        },
      ],
    },
  ];

  const renderSettingItem = (item, index, isLast) => (
    <TouchableOpacity
      key={index}
      style={[styles.settingItem, isLast && styles.lastSettingItem]}
      onPress={item.onPress}
      disabled={item.type === 'switch'}>
      
      <View style={styles.settingItemLeft}>
        <View style={styles.settingItemIcon}>
          <Icon name={item.icon} size={20} color="#007AFF" />
        </View>
        <View style={styles.settingItemContent}>
          <Text style={styles.settingItemTitle}>{item.title}</Text>
          {item.value && item.type === 'text' && (
            <Text style={styles.settingItemValue}>{item.value}</Text>
          )}
        </View>
      </View>

      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onPress}
          trackColor={{false: '#E5E5EA', true: '#007AFF'}}
          thumbColor="#FFFFFF"
        />
      ) : (
        <View style={styles.settingItemRight}>
          {item.value && (
            <Text style={styles.settingItemValueRight}>{item.value}</Text>
          )}
          <Icon name="chevron-right" size={20} color="#C7C7CC" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Paramètres</Text>
        </View>

        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupContainer}>
              {group.items.map((item, itemIndex) =>
                renderSettingItem(
                  item,
                  itemIndex,
                  itemIndex === group.items.length - 1,
                ),
              )}
            </View>
          </View>
        ))}

        {/* Informations sur l'application */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Version 1.0.0</Text>
          <Text style={styles.appInfoText}>© 2024 Mon Application Mobile</Text>
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
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  settingsGroup: {
    marginBottom: 30,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  groupContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  settingItemValue: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemValueRight: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 8,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
  },
  appInfoText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
});

export default SettingsScreen;
