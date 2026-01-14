import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, MapPin } from 'lucide-react-native';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Dakar, Sénégal');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    Alert.alert('Profil mis à jour', 'Vos informations ont été enregistrées avec succès');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={48} color="#008000" />
        </View>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.memberSince}>Membre depuis janvier 2026</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <User size={20} color="#6B7280" />
              <Text style={styles.label}>Nom complet</Text>
            </View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Votre nom"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Mail size={20} color="#6B7280" />
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={user?.email}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Phone size={20} color="#6B7280" />
              <Text style={styles.label}>Téléphone</Text>
            </View>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+221 XX XXX XX XX"
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <MapPin size={20} color="#6B7280" />
              <Text style={styles.label}>Localisation</Text>
            </View>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Votre ville"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Note moyenne</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>25</Text>
            <Text style={styles.statLabel}>Trajets effectués</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Taux de confirmation</Text>
          </View>
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
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    gap: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputGroup: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  inputDisabled: {
    backgroundColor: '#F3F4F6',
    color: '#9CA3AF',
  },
  saveButton: {
    backgroundColor: '#008000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#008000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
