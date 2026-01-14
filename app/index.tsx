import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { PublicHeader } from '@/components/PublicHeader';
import { Footer } from '@/components/Footer';
import { Car, Package, MapPin, Clock } from 'lucide-react-native';

export default function LandingPage() {
  const features = [
    {
      icon: Car,
      title: 'Covoiturage',
      description: 'Partagez vos trajets et économisez sur vos déplacements quotidiens',
    },
    {
      icon: Package,
      title: 'Envoi de colis',
      description: 'Envoyez vos colis rapidement et en toute sécurité partout au Sénégal',
    },
    {
      icon: MapPin,
      title: 'Livraison rapide',
      description: 'Service de livraison express pour vos besoins urgents',
    },
    {
      icon: Clock,
      title: 'Disponible 24/7',
      description: 'Accédez à nos services à tout moment, jour et nuit',
    },
  ];

  return (
    <View style={styles.container}>
      <PublicHeader />

      <ScrollView style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Mobilité et Livraison au Sénégal
          </Text>
          <Text style={styles.heroSubtitle}>
            Covoiturage, envoi de colis et livraisons rapides partout au Sénégal.
            Rejoignez des milliers d'utilisateurs qui font confiance à Yombal Yoon.
          </Text>
          <View style={styles.heroButtons}>
            <Link href="/signup" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Commencer maintenant</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/about" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>En savoir plus</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.features}>
          <Text style={styles.sectionTitle}>Nos Services</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <feature.icon size={32} color="#008000" />
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Prêt à commencer ?</Text>
          <Text style={styles.ctaText}>
            Créez votre compte gratuitement et profitez de tous nos services
          </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Inscription gratuite</Text>
            </TouchableOpacity>
          </Link>
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
    paddingVertical: 80,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 56,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 700,
    lineHeight: 28,
    marginBottom: 32,
  },
  heroButtons: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#008000',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
  },
  features: {
    paddingHorizontal: 20,
    paddingVertical: 80,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 48,
  },
  featuresGrid: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: Platform.OS === 'web' ? 280 : '100%',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  cta: {
    backgroundColor: '#008000',
    paddingHorizontal: 20,
    paddingVertical: 80,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    maxWidth: 600,
    marginBottom: 32,
    lineHeight: 28,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#008000',
    fontSize: 16,
    fontWeight: '600',
  },
});
