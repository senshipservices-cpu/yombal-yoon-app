import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>Page non trouvée</Text>
      <Text style={styles.description}>
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </Text>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Home size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 72,
    fontWeight: '700',
    color: '#008000',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 400,
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#008000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
