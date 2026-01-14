import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Menu, X } from 'lucide-react-native';
import { useState } from 'react';

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const NavLink = ({ href, children }: { href: string; children: string }) => (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.navLink}>
        <Text style={styles.navLinkText}>{children}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Text style={styles.logo}>Yombal Yoon</Text>
          </TouchableOpacity>
        </Link>

        {Platform.OS === 'web' ? (
          <View style={styles.desktopNav}>
            <NavLink href="/pricing">Tarifs</NavLink>
            <NavLink href="/about">À propos</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Connexion</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/signup" asChild>
              <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signupButtonText}>Inscription</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} color="#1F2937" /> : <Menu size={24} color="#1F2937" />}
          </TouchableOpacity>
        )}
      </View>

      {menuOpen && Platform.OS !== 'web' && (
        <View style={styles.mobileMenu}>
          <NavLink href="/pricing">Tarifs</NavLink>
          <NavLink href="/about">À propos</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/login">Connexion</NavLink>
          <NavLink href="/signup">Inscription</NavLink>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#008000',
  },
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  navLink: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  navLinkText: {
    fontSize: 15,
    color: '#4B5563',
    fontWeight: '500',
  },
  loginButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loginButtonText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  signupButton: {
    backgroundColor: '#008000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  signupButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  mobileMenu: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
});
