import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import { Container, Title, BodyText, Button, ButtonText } from '../components/UI';

export default function ProfileScreen() {
  const { userToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${config.BACKEND_URL}/me`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await res.json();
        if (data.success) setUser(data.user);
      } catch (err) {
        console.log('Fetch user error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userToken]);

  if (loading || !user) {
    return (
      <Container>
        <Title>Loading Profile...</Title>
        <ActivityIndicator color={config.theme.colors.primary} />
      </Container>
    );
  }

  return (
    <Container>
      <Title>{user.fullname}</Title>
      <BodyText style={{ marginBottom: 8 }}>{user.email}</BodyText>

      <Button onPress={() => navigation.navigate('EditProfile')}>
        <ButtonText>Edit Profile</ButtonText>
      </Button>
    </Container>
  );
}
