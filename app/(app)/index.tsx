import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Car, Package, MapPin, TrendingUp } from 'lucide-react-native';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { icon: Car, label: 'Trajets', value: '12', color: '#008000' },
    { icon: Package, label: 'Colis', value: '8', color: '#F59E0B' },
    { icon: MapPin, label: 'Livraisons', value: '5', color: '#3B82F6' },
    { icon: TrendingUp, label: 'Points', value: '350', color: '#8B5CF6' },
  ];

  const recentActivities = [
    { title: 'Trajet Dakar - Thiès', date: '14 Jan 2026', status: 'Complété' },
    { title: 'Colis envoyé à Kaolack', date: '13 Jan 2026', status: 'En transit' },
    { title: 'Livraison express', date: '12 Jan 2026', status: 'Complété' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour,</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <stat.icon size={32} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activités récentes</Text>
        <View style={styles.activities}>
          {recentActivities.map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  activity.status === 'Complété' && styles.statusCompleted,
                  activity.status === 'En transit' && styles.statusInProgress,
                ]}
              >
                <Text style={styles.statusText}>{activity.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Car size={24} color="#008000" />
            <Text style={styles.actionText}>Nouveau trajet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Package size={24} color="#008000" />
            <Text style={styles.actionText}>Envoyer un colis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  email: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  activities: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusInProgress: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  quickActions: {
    padding: 16,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#008000',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#008000',
    marginTop: 8,
  },
});
