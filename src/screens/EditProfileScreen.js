import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import axios from 'axios';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import {
  Container, Input, Button, ButtonText, Title
} from '../components/UI';

export default function EditProfileScreen() {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState({ fullname: '', email: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fullNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    fullNameRef.current?.blur();
    emailRef.current?.blur();
    passRef.current?.blur();
    confirmRef.current?.blur();
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${config.BACKEND_URL}/me`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await res.json();
        if (data.success) {
          setUser({ fullname: data.user.fullname, email: data.user.email });
        } else {
          Dialog.show({ type: ALERT_TYPE.DANGER, title: 'Error', textBody: data.message });
        }
      } catch (err) {
        Dialog.show({ type: ALERT_TYPE.DANGER, title: 'Error', textBody: err.message || 'Failed to fetch user' });
      } finally {
        setLoading(false);
      }
    };
    if (userToken) fetchUser();
  }, [userToken]);

  const handleSave = async () => {
    if (saving) return;
    if (!user.fullname || !user.email) {
      Dialog.show({ type: ALERT_TYPE.DANGER, title: 'Missing Fields', textBody: 'Full name and email are required' });
      return;
    }
    if (password && password !== confirmPassword) {
      Dialog.show({ type: ALERT_TYPE.DANGER, title: 'Password Mismatch', textBody: 'Passwords do not match' });
      return;
    }

    setSaving(true);
    try {
      const res = await axios.put(
        `${config.BACKEND_URL}/update-user`,
        { fullname: user.fullname, email: user.email, password: password || undefined },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (res.data.success) {
        Dialog.show({ type: ALERT_TYPE.SUCCESS, title: 'Success', textBody: 'Profile updated successfully' });
        setPassword('');
        setConfirmPassword('');
      } else {
        Dialog.show({ type: ALERT_TYPE.DANGER, title: 'Update Failed', textBody: res.data.message });
      }
    } catch (err) {
      Dialog.show({ type: ALERT_TYPE.DANGER, title: 'Error', textBody: err.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.wrapper}>
          <Container>
            <Title>Loading Profile...</Title>
            <ActivityIndicator size="large" color="#2196F3" />
          </Container>
        </View>
      </TouchableWithoutFeedback>
    );
  }


  return (
    <View style={styles.wrapper}>
  <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={{ flex: 1 }}>
      <Container>
        <Title>Edit Profile</Title>

        <Input
          ref={fullNameRef}
          placeholder="Full Name"
          autoCapitalize="words"
          value={user.fullname}
          onChangeText={text => setUser(prev => ({ ...prev, fullname: text }))}
        />

        <Input
          ref={emailRef}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={user.email}
          onChangeText={text => setUser(prev => ({ ...prev, email: text }))}
        />

        <Input
          ref={passRef}
          placeholder="New Password (leave blank to keep current)"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        <Input
          ref={confirmRef}
          placeholder="Confirm New Password"
          secureTextEntry
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button onPress={handleSave} disabled={saving} style={saving ? { backgroundColor: '#1769aa' } : {}}>
          {saving ? <ActivityIndicator color="#fff" /> : <ButtonText>Save Changes</ButtonText>}
        </Button>
      </Container>
    </View>
  </TouchableWithoutFeedback>
</View>

  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: config.theme.colors.background,
  },
});
