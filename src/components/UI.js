// components/UI.js
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Easing,
} from 'react-native';

// Container for screens or sections
export const Container = ({ children, style }) => (
  <View style={[styles.container, style]}>{children}</View>
);

// Input with enhanced styles
export const Input = (props) => (
  <TextInput
    style={styles.input}
    placeholderTextColor="rgba(255, 255, 255, 0.6)"
    {...props}
  />
);

// Button variants
export const Button = ({ children, style, variant = 'primary', ...rest }) => {
  const backgroundColors = {
    primary: 'rgba(33, 150, 243, 0.9)',
    secondary: 'rgba(100, 100, 100, 0.8)',
    danger: 'rgba(255, 80, 80, 0.9)',
    success: 'rgba(60, 180, 75, 0.9)',
    disabled: 'rgba(120, 120, 120, 0.6)',
  };

  const bgColor = rest.disabled
    ? backgroundColors.disabled
    : backgroundColors[variant] || backgroundColors.primary;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, style]}
      activeOpacity={0.8}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

export const ButtonText = ({ children, style }) => (
  <Text style={[styles.buttonText, style]}>{children}</Text>
);

// Text styles
export const Title = ({ children, style }) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

export const Subtitle = ({ children, style }) => (
  <Text style={[styles.subtitle, style]}>{children}</Text>
);

export const BodyText = ({ children, style }) => (
  <Text style={[styles.bodyText, style]}>{children}</Text>
);

export const LinkText = ({ children, onPress, style }) => (
  <Text style={[styles.linkText, style]} onPress={onPress}>
    {children}
  </Text>
);

// Modal component with header, body and footer slots
export const CustomModal = ({
  visible,
  onClose,
  title,
  children,
  footer,
  style,
}) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={[styles.modalContainer, style]}>
        {title && <Text style={styles.modalTitle}>{title}</Text>}
        <View style={styles.modalBody}>{children}</View>
        {footer && <View style={styles.modalFooter}>{footer}</View>}
      </View>
    </View>
  </Modal>
);

// Simple Toast Notification component
export const Toast = ({ message, visible, duration = 3000, onHide }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onHide && onHide();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

// Form container for grouped inputs/buttons
export const Form = ({ children, style }) => (
  <View style={[styles.formContainer, style]}>{children}</View>
);

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
  subtitle: {
    color: '#ccc',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  bodyText: {
    color: '#aaa',
    fontSize: 16,
    lineHeight: 22,
  },
  linkText: {
    marginTop: 24,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContainer: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalBody: {
    marginBottom: 20,
  },
  modalFooter: {
    alignItems: 'center',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(33,150,243,0.9)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
    marginVertical: 12,
  },
});
