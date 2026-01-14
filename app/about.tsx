import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PublicHeader } from '@/components/PublicHeader';
import { Footer } from '@/components/Footer';
import { Users, Target, Heart, Award } from 'lucide-react-native';

export default function AboutPage() {
  const values = [
    {
      icon: Users,
      title: 'Communauté',
      description: 'Nous créons des liens entre les Sénégalais pour une mobilité partagée',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Des solutions technologiques adaptées aux besoins locaux',
    },
    {
      icon: Heart,
      title: 'Confiance',
      description: 'La sécurité et la satisfaction de nos utilisateurs avant tout',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Un service de qualité accessible à tous',
    },
  ];

  return (
    <View style={styles.container}>
      <PublicHeader />

      <ScrollView style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>À propos de Yombal Yoon</Text>
          <Text style={styles.subtitle}>
            La plateforme de référence pour la mobilité et la livraison au Sénégal
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre Mission</Text>
          <Text style={styles.text}>
            Yombal Yoon révolutionne la mobilité au Sénégal en connectant les personnes et les biens
            à travers une plateforme simple, sécurisée et accessible. Nous croyons en une mobilité
            partagée qui profite à tous : économique, écologique et sociale.
          </Text>
          <Text style={styles.text}>
            Que ce soit pour un trajet quotidien, l'envoi d'un colis ou une livraison urgente,
            Yombal Yoon facilite les déplacements et les échanges partout au Sénégal.
          </Text>
        </View>

        <View style={styles.valuesSection}>
          <Text style={styles.sectionTitle}>Nos Valeurs</Text>
          <View style={styles.valuesGrid}>
            {values.map((value, index) => (
              <View key={index} style={styles.valueCard}>
                <value.icon size={40} color="#008000" />
                <Text style={styles.valueTitle}>{value.title}</Text>
                <Text style={styles.valueDescription}>{value.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10,000+</Text>
            <Text style={styles.statLabel}>Utilisateurs actifs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50,000+</Text>
            <Text style={styles.statLabel}>Trajets partagés</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15,000+</Text>
            <Text style={styles.statLabel}>Colis livrés</Text>
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
    fontSize: 20,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 700,
    lineHeight: 30,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    maxWidth: 800,
    marginHorizontal: 'auto',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 24,
  },
  text: {
    fontSize: 17,
    color: '#4B5563',
    lineHeight: 28,
    marginBottom: 16,
  },
  valuesSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: '#F9FAFB',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  valueCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    width: 280,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  valueTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  valueDescription: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    paddingHorizontal: 20,
    paddingVertical: 60,
    justifyContent: 'center',
  },
  statCard: {
    alignItems: 'center',
    padding: 24,
  },
  statNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#008000',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
});
