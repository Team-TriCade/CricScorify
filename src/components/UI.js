// components/UI.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const Input = (props) => (
  <TextInput
    style={styles.input}
    placeholderTextColor="rgba(255, 255, 255, 0.6)"
    {...props}
  />
);

export const Button = ({ children, style, ...rest }) => (
  <TouchableOpacity style={[styles.button, style]} activeOpacity={0.8} {...rest}>
    {children}
  </TouchableOpacity>
);

export const ButtonText = ({ children }) => (
  <Text style={styles.buttonText}>{children}</Text>
);

export const LinkText = ({ children, onPress }) => (
  <Text style={styles.linkText} onPress={onPress}>{children}</Text>
);

export const Title = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(18,18,18,0.95)',
    justifyContent: 'center',
    padding: 24,
    backdropFilter: 'blur(12px)', // this may work on web only, keep for style hint
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    color: '#fff',
    padding: 16,
    marginVertical: 12,
    borderRadius: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  button: {
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: '#e0e0e0',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  linkText: {
    marginTop: 24,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(33, 150, 243, 0.8)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },
});
