import React, { useEffect, useContext, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import {
  Container,
  Title,
  Button,
  ButtonText,
  BottomTabBar,
  Subtitle,
  BodyText,
} from '../components/UI';

export default function HomeScreen() {
  const { logout, userToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('home');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${config.BACKEND_URL}/me`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await res.json();
        if (data.success) setUser(data.user);
      } catch (err) {
        console.log('Fetch user error:', err);
      }
    };
    if (userToken) fetchUser();
  }, [userToken]);

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'profile', label: 'Profile', icon: 'account' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: config.theme.colors.background }}>
      <Container style={{ flex: 1, paddingBottom: 80 }}>
        {tab === 'home' && (
          <>
            <Title style={{ marginBottom: 20 }}>
              {user ? `Welcome, ${user.fullname} 🎯` : 'Loading...'}
            </Title>
            <Subtitle style={{ textAlign: 'center', marginBottom: 40, color: config.theme.colors.text2 }}>
              Your personalized dashboard is ready.
            </Subtitle>
            <Button
              onPress={logout}
              style={{ backgroundColor: config.theme.colors.danger, alignSelf: 'center', width: '50%' }}
            >
              <ButtonText>Logout</ButtonText>
            </Button>
          </>
        )}
        {tab === 'profile' && user && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Title style={{ marginBottom: 24 }}>Profile</Title>
            <BodyText style={{ marginBottom: 12 }}>Full Name: {user.fullname}</BodyText>
            <BodyText>Email: {user.email}</BodyText>
          </ScrollView>
        )}
      </Container>
      <BottomTabBar tabs={tabs} selectedTab={tab} onSelectTab={setTab} />
    </View>
  );
}
