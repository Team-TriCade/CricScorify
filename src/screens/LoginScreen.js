import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import { Container, Input, Button, ButtonText, LinkText, Title } from '../components/UI';

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
    <Container>
      <Title>Login</Title>

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

      <Button onPress={handleLogin} disabled={loading} activeOpacity={0.8} style={loading ? { backgroundColor: '#3a7a34' } : {}}>
        {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Login</ButtonText>}
      </Button>

      <LinkText onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign up
      </LinkText>
    </Container>
  );
}
