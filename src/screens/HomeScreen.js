import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Button from '../components/common/Button';
import {setCurrentScreen} from '../store/slices/appSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {isLoading} = useSelector(state => state.app);

  useEffect(() => {
    dispatch(setCurrentScreen('Home'));
  }, [dispatch]);

  const handleRefresh = () => {
    // Logique de rafraîchissement des données
    console.log('Refreshing data...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }>
        
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Bonjour {user?.firstName || 'Utilisateur'} !
          </Text>
          <Text style={styles.subtitle}>
            Bienvenue dans votre application
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Statistiques</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>42</Text>
                <Text style={styles.statLabel}>Éléments</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>En cours</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>34</Text>
                <Text style={styles.statLabel}>Terminés</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Actions rapides</Text>
            <View style={styles.actionsContainer}>
              <Button
                title="Nouvelle tâche"
                variant="primary"
                size="small"
                style={styles.actionButton}
              />
              <Button
                title="Voir tout"
                variant="secondary"
                size="small"
                style={styles.actionButton}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Activité récente</Text>
            <View style={styles.activityContainer}>
              <View style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Tâche complétée</Text>
                  <Text style={styles.activityTime}>Il y a 2 heures</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Nouvelle notification</Text>
                  <Text style={styles.activityTime}>Il y a 4 heures</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Profil mis à jour</Text>
                  <Text style={styles.activityTime}>Hier</Text>
                </View>
              </View>
            </View>
          </View>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  content: {
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  activityContainer: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

export default HomeScreen;
