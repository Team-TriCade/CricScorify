import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { AuthContext } from '../context/AuthContext';
import config from '../config.json';

export default function SignupScreen({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const showDialog = (type, title, text, button = 'OK') =>
    Dialog.show({ type, title, textBody: text, button });

  const handleSignup = async () => {
    if (loading) return;

    if (!fullname || !email || !password || !confirmPassword) {
      showDialog(ALERT_TYPE.DANGER, 'Missing Fields', 'All fields are required');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${config.BACKEND_URL}/create-user`, {
        fullname,
        email,
        password,
        confirmPassword,
      });

      if (res.data.success) {
        login(res.data.token);
        showDialog(ALERT_TYPE.SUCCESS, 'Signup Successful', 'Welcome!');
      } else {
        showDialog(ALERT_TYPE.DANGER, 'Signup Failed', res.data.message);
      }
    } catch (err) {
      showDialog(ALERT_TYPE.DANGER, 'Error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={fullname}
        onChangeText={setFullname}
        autoCapitalize="words"
      />

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignup}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      <Text style={styles.switchText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
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
    backgroundColor: '#2196F3',
    padding: 14,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#1769aa',
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
