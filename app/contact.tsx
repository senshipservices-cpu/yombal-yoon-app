import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { PublicHeader } from '@/components/PublicHeader';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react-native';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    Alert.alert('Message envoyé', 'Nous vous répondrons dans les plus brefs délais');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <PublicHeader />

      <ScrollView style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Contactez-nous</Text>
          <Text style={styles.subtitle}>
            Une question ? Une suggestion ? N'hésitez pas à nous contacter
          </Text>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.formSection}>
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom complet</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Votre nom"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="votre@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Votre message..."
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <TouchableOpacity
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <Mail size={24} color="#008000" />
              <Text style={styles.infoTitle}>Email</Text>
              <Text style={styles.infoText}>contact@yombalyoon.com</Text>
            </View>

            <View style={styles.infoCard}>
              <Phone size={24} color="#008000" />
              <Text style={styles.infoTitle}>Téléphone</Text>
              <Text style={styles.infoText}>+221 33 XXX XX XX</Text>
            </View>

            <View style={styles.infoCard}>
              <MapPin size={24} color="#008000" />
              <Text style={styles.infoTitle}>Adresse</Text>
              <Text style={styles.infoText}>Dakar, Sénégal</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 700,
    lineHeight: 28,
  },
  mainContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 48,
    paddingHorizontal: 20,
    paddingVertical: 60,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  formSection: {
    flex: 1,
    minWidth: 300,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
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
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#008000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    flex: 1,
    minWidth: 300,
    gap: 24,
  },
  infoCard: {
    backgroundColor: '#F9FAFB',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#6B7280',
  },
});
