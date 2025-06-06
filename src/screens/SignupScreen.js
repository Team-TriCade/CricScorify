import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import { Container, Input, Button, ButtonText, LinkText, Title } from '../components/UI';

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

    if (password !== confirmPassword) {
      showDialog(ALERT_TYPE.DANGER, 'Password Mismatch', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${config.BACKEND_URL}/create-user`, {
        fullname,
        email,
        password,
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
    <Container>
      <Title>Sign Up</Title>

      <Input
        placeholder="Full Name"
        autoCapitalize="words"
        value={fullname}
        onChangeText={setFullname}
      />

      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <Input
        placeholder="Confirm Password"
        secureTextEntry
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        onPress={handleSignup}
        disabled={loading}
        style={loading ? { backgroundColor: '#1769aa' } : {}}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Sign Up</ButtonText>}
      </Button>

      <LinkText onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </LinkText>
    </Container>
  );
}
