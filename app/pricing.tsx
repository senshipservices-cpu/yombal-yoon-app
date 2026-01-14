import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { PublicHeader } from '@/components/PublicHeader';
import { Footer } from '@/components/Footer';
import { Check } from 'lucide-react-native';

export default function PricingPage() {
  const plans = [
    {
      name: 'Gratuit',
      price: '0 FCFA',
      description: 'Pour commencer à utiliser nos services',
      features: [
        'Accès aux annonces de covoiturage',
        'Publication de trajets illimitée',
        'Envoi de colis standard',
        'Support client basique',
      ],
    },
    {
      name: 'Premium',
      price: '5 000 FCFA/mois',
      description: 'Pour les utilisateurs réguliers',
      features: [
        'Tous les avantages Gratuit',
        'Priorité dans les recherches',
        'Livraison express incluse',
        'Support client prioritaire',
        'Badge vérifié',
        'Statistiques détaillées',
      ],
      popular: true,
    },
    {
      name: 'Business',
      price: '25 000 FCFA/mois',
      description: 'Pour les professionnels',
      features: [
        'Tous les avantages Premium',
        'API d\'intégration',
        'Gestion d\'équipe',
        'Facturation personnalisée',
        'Support dédié 24/7',
        'Tableau de bord analytique',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <PublicHeader />

      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Tarifs simples et transparents</Text>
          <Text style={styles.subtitle}>
            Choisissez le plan qui correspond à vos besoins. Changez ou annulez à tout moment.
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {plans.map((plan, index) => (
            <View
              key={index}
              style={[
                styles.planCard,
                plan.popular && styles.popularCard,
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Populaire</Text>
                </View>
              )}
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
              <Text style={styles.planDescription}>{plan.description}</Text>

              <View style={styles.features}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.feature}>
                    <Check size={20} color="#008000" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <Link href="/signup" asChild>
                <TouchableOpacity
                  style={[
                    styles.planButton,
                    plan.popular && styles.popularButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.planButtonText,
                      plan.popular && styles.popularButtonText,
                    ]}
                  >
                    Commencer
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          ))}
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
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
  plansContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 24,
    paddingHorizontal: 20,
    paddingBottom: 80,
    justifyContent: 'center',
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 32,
    width: Platform.OS === 'web' ? 350 : '100%',
    position: 'relative',
  },
  popularCard: {
    borderColor: '#008000',
    transform: Platform.OS === 'web' ? [{ scale: 1.05 }] : [],
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#008000',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  planName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 36,
    fontWeight: '700',
    color: '#008000',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  features: {
    gap: 12,
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#4B5563',
    flex: 1,
  },
  planButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#008000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: '#008000',
    borderColor: '#008000',
  },
  planButtonText: {
    color: '#008000',
    fontSize: 16,
    fontWeight: '600',
  },
  popularButtonText: {
    color: '#FFFFFF',
  },
});
