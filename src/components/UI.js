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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../config';

const { colors, fontSizes, fonts, borderRadius } = config.theme;

export function BottomTabBar({ tabs, selectedTab, onSelectTab }) {
  return (
    <View style={[styles.tabBarContainer, { backgroundColor: colors.tabBackground }]}>
      {tabs.map((tab) => {
        const focused = selectedTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => onSelectTab(tab.key)}
            activeOpacity={0.7}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={focused ? colors.accent : colors.tabInactive}
            />
            <Text style={[styles.label, focused && styles.labelFocused]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export const Container = ({ children, style }) => (
  <View style={[styles.container, style]}>{children}</View>
);

export const Input = (props) => (
  <TextInput
    style={styles.input}
    placeholderTextColor={colors.text3}
    {...props}
  />
);

export const Button = ({ children, style, variant = 'primary', ...rest }) => {
  const backgroundColors = {
    primary: colors.primary,
    secondary: colors.secondary,
    danger: colors.danger,
    success: colors.success,
    disabled: colors.disabled,
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

export const Form = ({ children, style }) => (
  <View style={[styles.formContainer, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#444',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: fontSizes.label,
    color: colors.tabInactive,
    marginTop: 2,
  },
  labelFocused: {
    color: colors.accent,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    color: colors.text1,
    padding: 16,
    marginVertical: 12,
    borderRadius: borderRadius.input,
    fontSize: fontSizes.body,
    fontWeight: '400',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  button: {
    paddingVertical: 16,
    borderRadius: borderRadius.button,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: '#e0e0e0',
    fontSize: fontSizes.button,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    color: colors.text1,
    fontSize: fontSizes.title,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: fonts.title,
    letterSpacing: 1.5,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: colors.text2,
    fontSize: fontSizes.subtitle,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: fonts.body,
  },
  bodyText: {
    color: colors.text3,
    fontSize: fontSizes.body,
    lineHeight: 22,
    fontFamily: fonts.body,
  },
  linkText: {
    marginTop: 24,
    color: colors.text2,
    textAlign: 'center',
    fontSize: fontSizes.body,
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
    borderRadius: borderRadius.modal,
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
    fontSize: fontSizes.subtitle,
    fontWeight: '700',
    color: colors.text1,
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
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  toastText: {
    color: '#fff',
    fontSize: fontSizes.toast,
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
    marginVertical: 12,
  },
});
