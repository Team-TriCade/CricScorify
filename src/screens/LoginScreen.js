import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { AuthContext } from '../context/AuthContext';
import config from '../config.json';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const showDialog = (type, title, text, button = 'OK') =>
    Dialog.show({ type, title, textBody: text, button });

  const handleLogin = async () => {
    if (loading) return;
    if (!email || !password) {
      showDialog(ALERT_TYPE.DANGER, 'Missing Fields', 'Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${config.BACKEND_URL}/sign-in`, { email, password });

      if (res.data.success) {
        login(res.data.token);
        showDialog(ALERT_TYPE.SUCCESS, 'Login Successful', 'Welcome back!');
      } else {
        showDialog(ALERT_TYPE.DANGER, 'Login Failed', res.data.message);
      }
    } catch (err) {
      showDialog(ALERT_TYPE.DANGER, 'Error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <Text style={styles.switchText} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 14,
    marginVertical: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#3a7a34',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  switchText: {
    marginTop: 20,
    color: '#ccc',
    textAlign: 'center',
  },
});
