import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Lock, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsPage() {
  const { signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/');
          },
        },
      ]
    );
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    showToggle,
    toggleValue,
    onToggle,
  }: any) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={showToggle}
    >
      <View style={styles.settingLeft}>
        <Icon size={24} color="#6B7280" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
          thumbColor={toggleValue ? '#008000' : '#F3F4F6'}
        />
      ) : (
        <ChevronRight size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            icon={Bell}
            title="Notifications push"
            subtitle="Recevoir des notifications sur votre appareil"
            showToggle
            toggleValue={notifications}
            onToggle={setNotifications}
          />
          <SettingItem
            icon={Bell}
            title="Notifications par email"
            subtitle="Recevoir des notifications par email"
            showToggle
            toggleValue={emailNotifications}
            onToggle={setEmailNotifications}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compte</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            icon={Lock}
            title="Confidentialité"
            subtitle="Gérer vos paramètres de confidentialité"
            onPress={() => Alert.alert('Confidentialité', 'Fonctionnalité à venir')}
          />
          <SettingItem
            icon={Globe}
            title="Langue"
            subtitle="Français"
            onPress={() => Alert.alert('Langue', 'Fonctionnalité à venir')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.settingsGroup}>
          <SettingItem
            icon={HelpCircle}
            title="Centre d'aide"
            subtitle="FAQ et support"
            onPress={() => Alert.alert('Centre d\'aide', 'Fonctionnalité à venir')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Yombal Yoon v1.0.0</Text>
        <Text style={styles.footerText}>© 2026 Tous droits réservés</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  footer: {
    alignItems: 'center',
    padding: 24,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
