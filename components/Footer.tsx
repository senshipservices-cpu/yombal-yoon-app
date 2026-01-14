import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        <Text style={styles.copyright}>
          © 2026 Yombal Yoon. Tous droits réservés.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1F2937',
    paddingVertical: 24,
    marginTop: 'auto',
  },
  container: {
    paddingHorizontal: 20,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  copyright: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
