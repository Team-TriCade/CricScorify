// components/UI.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification';

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

export const showToast = (type, title, message, buttonText = 'OK') => {
  Dialog.show({
    type,
    title,
    textBody: message,
    button: buttonText,
    onDismiss: () => Dialog.hide(),
    onTouchOutside: () => Dialog.hide(),
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(18,18,18,0.95)',
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    color: '#f0f0f0',
    padding: 16,
    marginVertical: 12,
    borderRadius: 16,
    fontSize: 17,
    fontWeight: '400',
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
    letterSpacing: 1,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  linkText: {
    marginTop: 24,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  title: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'System',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(33, 150, 243, 0.85)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
});
